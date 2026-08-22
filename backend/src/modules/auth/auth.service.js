const bcrypt = require("bcryptjs");
const User = require("../users/user.model");
const {
  hashToken,
  generateResetToken,
  generateEmailVerificationToken,
} = require("./auth.utils");
const RefreshToken = require("./refreshToken.model");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../../utils/jwt");
const ApiError=require("../../utils/ApiError");

const { sendVerificationEmail } = require("../../services/email.service");

const jwt = require("jsonwebtoken");

//-----------------------------------------
const register = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw ApiError.conflict("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const verificationToken = generateEmailVerificationToken();
  const hashedVerificationToken = hashToken(verificationToken);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    isEmailVerified: false,
    emailVerificationToken: hashedVerificationToken,

    emailVerificationExpires: new Date(Date.now() + 10 * 60 * 1000),
  });
  try {
    await sendVerificationEmail(user.email, verificationToken);
  } catch (error) {
    await User.findByIdAndDelete(user._id);
    console.error("EMAIL ERROR:", error);
    throw ApiError.badRequest("Failed to send verification email");
  }

  return user;
};
//-----------------------------------------
const verifyEmail = async (token) => {
  const hashedToken = hashToken(token);

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: {
      $gt: new Date(),
    },
  });

  if (!user) {
    throw ApiError.badRequest("Invalid or expired verification token");
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = null;
  user.emailVerificationExpires = null;

  await user.save();

  return user;
};
//-----------------------------------------
const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw ApiError.badRequest("Invalid email or password");
  }

  if (!user.isActive) {
    throw ApiError.badRequest("Your account is inactive");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw ApiError.badRequest("Invalid email pr password");
  }

  if (!user.isEmailVerified) {
  throw ApiError.badRequest(
    "Please verify your email before logging in."
  );
}

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  const tokenHash = hashToken(refreshToken);

  const decodedRefreshToken = jwt.decode(refreshToken);
  await RefreshToken.create({
    user: user._id,
    tokenHash,
    expiresAt: new Date(decodedRefreshToken.exp * 1000),
  });
  user.lastLogin = new Date();
  await user.save();

  return {
    user,
    accessToken,
    refreshToken,
  };
};

//-----------------------------------------

const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw ApiError.badRequest("Refresh token is required.");
  }

  const decoded = verifyRefreshToken(refreshToken);

  const tokenHash = hashToken(refreshToken);

  const storedToken = await RefreshToken.findOne({
    tokenHash,
    user: decoded.userId,
  });

  if (!storedToken) {
    throw ApiError.badRequest("Invalid refresh token");
  }

  if (storedToken.expiresAt < new Date()) {
    await RefreshToken.deleteOne({ _id: storedToken });
    throw ApiError.badRequest("Refresh token expired");
  }
  const user = await User.findById(decoded.userId);

  if (!user || !user.isActive) {
    throw ApiError.badRequest("User not found or inActive");
  }
  await RefreshToken.deleteOne({
    _id: storedToken._id,
  });

  const newAccessToken = generateAccessToken(user._id);

  const newRefreshToken = generateRefreshToken(user._id);

  const newTokenHash = hashToken(newRefreshToken);

  const newDecodedToken = jwt.decode(newRefreshToken);
  await RefreshToken.create({
    user: user._id,
    tokenHash: newTokenHash,
    expiresAt: new Date(newDecodedToken.exp * 1000),
  });

  return {
    user,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};
//---------------------
const loginWithGoogle = async (googleData) => {
  const {
    sub: googleId,
    name,
    email,
    picture,
    email_verified,
  } = googleData;

  if (!email_verified) {
    throw ApiError.badRequest("Google email is not verified");
  }

  let user = await User.findOne({
    $or: [
      { googleId },
      { email },
    ],
  });

  // User doesn't exist
  if (!user) {
    user = await User.create({
      name,
      email,
      googleId,
      authProvider: "google",
      isEmailVerified: true,
      avatar: picture,
    });
  }

  // User already exists
  else {
    // Link Google account if needed
    if (!user.googleId) {
      user.googleId = googleId;
    }

    user.isEmailVerified = true;

    if (user.authProvider === "local") {
      user.authProvider = "google";
    }

    if (picture && !user.profileImage) {
      user.avatar = picture;
    }

    await user.save();
  }

  // Generate OUR tokens
  const accessToken = generateAccessToken(user._id);

  const refreshToken = await generateRefreshToken(
    user._id
  );

  return {
    user,
    accessToken,
    refreshToken,
  };
};

//------------------------------------
const logout = async (refreshToken) => {
  if (!refreshToken) return;

  const tokenHash = hashToken(refreshToken);

  await RefreshToken.deleteOne({
    tokenHash,
  });
};
//------------------------------------------------
const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw ApiError.notFound("No user found with this email");
  }

  const resetToken = generateResetToken();

  const hashedToken = hashToken(resetToken);

  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

  await user.save({ validateBeforeSave: false });
  console.log("Saved user:", {
    passwordResetToken: user.passwordResetToken,
    passwordResetExpires: user.passwordResetExpires,
  });
  console.log(`Password reset token for ${email}: ${resetToken}`);

  return resetToken;
};

const resetPassword = async (token, newPassword) => {
  const hashedToken = hashToken(token);
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {
      $gt: new Date(),
    },
  });

  if (!user) {
    throw ApiError.badRequest("Invalid or expired password reset token");
  }
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  user.password = hashedPassword;
  user.passwordResetToken = null;
  user.passwordResetExpires = null;
  user.passwordChangedAt = new Date();
  await user.save();

  return user;
};

///-----------------
const getMe = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return user;
};
//---------------
const resendVerificationEmail = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    return;
  }

  if (user.isEmailVerified) {
    return;
  }

  const verificationToken =
    generateEmailVerificationToken();

  const hashedToken = hashToken(verificationToken);

  user.emailVerificationToken = hashedToken;

  user.emailVerificationExpires = new Date(
    Date.now() + 10 * 60 * 1000
  );

  await user.save({
    validateBeforeSave: false,
  });

  await sendVerificationEmail(
    user.email,
    verificationToken
  );
};
//---------------------------------


module.exports = {
  register,
  login,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  loginWithGoogle,
  getMe,
  resendVerificationEmail,
  verifyEmail
};
