const express = require("express");
const authController = require("../controllers/auth.controller");

const {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  resendVerificationSchema
} = require("../validators/auth.validator");

const validate = require("../middlewares/validate.middleware");
const { protect, restrictTo } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", validate(registerSchema), authController.register);

router.post("/login", validate(loginSchema), authController.login);

router.post("/logout", authController.logout);

router.post("/refresh", authController.refresh);

router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  authController.forgotPassword,
);

router.patch(
  "/reset-password/:token",
  validate(resetPasswordSchema),
  authController.resetPassword,
);

router.get("/google", authController.googleLogin);

router.get("/verify-email/:token", authController.verifyEmail);
router.get("/google/callback", authController.googleCallback);

router.get("/admin-test", protect, restrictTo("admin"), (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome Admin",
  });
});

router.get("/me", protect, authController.getMe);

router.post(
  "/resend-verification",
  validate(resendVerificationSchema),
  authController.resendVerification
);
module.exports = router;
