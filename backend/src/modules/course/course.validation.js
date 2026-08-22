const Joi = require("joi");

const createCourseSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(2)
    .max(200)
    .required(),

  slug: Joi.string()
    .trim()
    .lowercase()
    .pattern(/^[a-z0-9-]+$/)
    .required(),

  description: Joi.string()
    .trim()
    .min(10)
    .max(5000)
    .required(),

  thumbnail: Joi.string()
    .uri()
    .allow(null, ""),

  category: Joi.string()
    .required(),

  level: Joi.string()
    .valid("beginner", "intermediate", "advanced")
    .default("beginner"),

  language: Joi.string()
    .trim()
    .max(50)
    .default("Arabic"),

  price: Joi.number()
    .min(0)
    .default(0),

  isPublished: Joi.boolean()
    .default(false),
});

const updateCourseSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(2)
    .max(200),

  slug: Joi.string()
    .trim()
    .lowercase()
    .pattern(/^[a-z0-9-]+$/),

  description: Joi.string()
    .trim()
    .min(10)
    .max(5000),

  thumbnail: Joi.string()
    .uri()
    .allow(null, ""),

  category: Joi.string(),

  level: Joi.string()
    .valid("beginner", "intermediate", "advanced"),

  language: Joi.string()
    .trim()
    .max(50),

  price: Joi.number()
    .min(0),

  isPublished: Joi.boolean(),
}).min(1);

module.exports = {
  createCourseSchema,
  updateCourseSchema,
};