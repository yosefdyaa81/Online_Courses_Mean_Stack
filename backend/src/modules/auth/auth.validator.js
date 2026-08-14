const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name cannot exceed 50 characters",
      "any.required": "Name is required",
    }),

  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required()
    .messages({
      "string.email": "Please provide a valid email",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .min(8)
    .max(128)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password cannot exceed 128 characters",
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),

  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Passwords do not match",
      "any.required": "Confirm password is required",
      "string.empty": "Confirm password is required",
    }),
});


const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required()
    .messages({
      "string.email": "Please provide a valid email",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .required()
    .messages({
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
});


const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required()
    .messages({
      "string.email": "Please provide a valid email",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),
});


const resetPasswordSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .max(128)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password cannot exceed 128 characters",
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),

  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Passwords do not match",
      "any.required": "Confirm password is required",
      "string.empty": "Confirm password is required",
    }),
});

const resendVerificationSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  resendVerificationSchema
};