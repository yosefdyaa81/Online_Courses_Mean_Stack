const Joi = require("joi");

const createCategorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),

  slug: Joi.string()
    .trim()
    .lowercase()
    .pattern(/^[a-z0-9-]+$/)
    .required(),

  description: Joi.string().trim().max(500).allow(""),

  image: Joi.string().uri().allow(null, ""),
});

const updateCategorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),

  slug: Joi.string()
    .trim()
    .lowercase()
    .pattern(/^[a-z0-9-]+$/),

  description: Joi.string().trim().max(500).allow(""),

  image: Joi.string().uri().allow(null, ""),

  isActive: Joi.boolean(),
}).min(1);

module.exports = {
  createCategorySchema,
  updateCategorySchema,
};