const authServices = require("./auth.service");
const crypto = require("crypto");
const googleOAuth2Client = require("../../config/google.config");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await authServices.register({
    name,
    email,
    password,
  });

  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  });
};
//----------------------------
const login = async (req, res) => {
  const { user, accessToken, refreshToken } = await authServices.login(
    req.body,
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    status: "success",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
    },
  });
};
//---------------------------
const googleLogin = (req, res) => {
  const state = crypto.randomBytes(32).toString("hex");

  res.cookie("googleOAuthState", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 10 * 60 * 1000,
  });

  const authorizationUrl = googleOAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["openid", "email", "profile"],
    state,
    prompt: "select_account",
  });
  res.redirect(authorizationUrl);
};

//--------------
const googleCallback = async (req, res) => {
  const { code, state } = req.query;

  const savedState = req.cookies.googleOAuthState;

  // Check OAuth state
  if (!state || !savedState || state !== savedState) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid OAuth state",
    });
  }

  // Remove state cookie
  res.clearCookie("googleOAuthState");

  // Check authorization code
  if (!code) {
    return res.status(400).json({
      status: "fail",
      message: "Google authorization code is missing",
    });
  }

  // Exchange code for Google tokens
  const { tokens } =
    await googleOAuth2Client.getToken(code);

  googleOAuth2Client.setCredentials(tokens);

  // Get Google user information
  const { data } =
    await googleOAuth2Client.request({
      url: "https://www.googleapis.com/oauth2/v3/userinfo",
    });

  console.log("Google User:", data);

  // Make sure Google verified the email
  if (!data.email_verified) {
    return res.status(400).json({
      status: "fail",
      message: "Google email is not verified",
    });
  }

  // Login/Create user in our database
  const {
    user,
    accessToken,
    refreshToken,
  } = await authServices.loginWithGoogle(data);

  // Our refresh token
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
    },
  });
};
const refresh = async (req, res) => {
  console.log("Cookies:", req.cookies);
  const refreshToken = req.cookies.refreshToken;
  console.log("Refresh Token:", refreshToken);
  const result = await authServices.refreshAccessToken(refreshToken);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    status: "success",
    data: {
      accessToken: result.accessToken,
    },
  });
};
const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    await authServices.logout(refreshToken);
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(204).send();
};

const forgotPassword = async (req, res) => {
  await authServices.forgotPassword(req.body.email);

  res.status(200).json({
    status: "success",
    message: "If this email exists, a password reset link will be sent.",
  });
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({
      status: "fail",
      message: "Passwords do not match",
    });
  }
  await authServices.resetPassword(token, password);
  res.status(200).json({
    status: "success",
    message: "Password has been reset successfully",
  });
};
//------------------------
const verifyEmail = async (req, res) => {
  const { token } = req.params;

  await authServices.verifyEmail(token);

  res.status(200).json({
    status: "success",
    message: "Email verified successfully.",
  });
};

//------------------
const getMe = async (req, res) => {
  const user = await authServices.getMe(req.user._id);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};
//---------------------------------------

const resendVerification = async (req, res) => {
  await authServices.resendVerificationEmail(
    req.body.email
  );

  res.status(200).json({
    status: "success",
    message:
      "If the account exists and is not verified, a verification email has been sent.",
  });
};
//-----------------------
module.exports = {
  register,
  login,
  refresh,
  logout,
  forgotPassword,
  resetPassword,
  googleLogin,
  googleCallback,
  verifyEmail,
  getMe,
  resendVerification
};
