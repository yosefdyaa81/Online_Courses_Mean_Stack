const crypto = require("crypto");

const generateEmailVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};
const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

const generateResetToken = () => {
  return crypto.randomBytes(32).toString("hex");
};
module.exports = { hashToken, generateResetToken,generateEmailVerificationToken};
