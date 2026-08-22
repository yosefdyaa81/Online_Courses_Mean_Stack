const Joi = require("joi");

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const userIdParamSchema = Joi.object({
  id: Joi.string().pattern(objectIdPattern).required().messages({
    "string.pattern.base": "Invalid User ID format",
    "any.required": "User ID is required",
  }),
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  avatar: Joi.string().uri().allow("").optional(),
  bio: Joi.string().max(250).allow("").optional(),
});

const updateRoleSchema = Joi.object({
  role: Joi.string()
    .valid("user", "admin")
    .required()
    .messages({
      "any.only": "Role must be either user or admin",
      "any.required": "Role field is required",
    }),
});

module.exports = {
  userIdParamSchema,
  updateUserSchema,
  updateRoleSchema,
};