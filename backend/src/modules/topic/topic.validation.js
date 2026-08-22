const Joi = require("joi");

const createTopicSchema = Joi.object({
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
    .max(2000)
    .allow(""),

  playlistUrl: Joi.string()
    .uri()
    .required(),

  course: Joi.string()
    .required(),

  level: Joi.string()
    .valid(
      "beginner",
      "intermediate",
      "advanced"
    )
    .default("beginner"),

  order: Joi.number()
    .integer()
    .min(1)
    .required(),

  isPublished: Joi.boolean()
    .default(false),
});

const updateTopicSchema = Joi.object({
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
    .max(2000)
    .allow(""),

  playlistUrl: Joi.string()
    .uri(),

  course: Joi.string(),

  level: Joi.string()
    .valid(
      "beginner",
      "intermediate",
      "advanced"
    ),

  order: Joi.number()
    .integer()
    .min(1),

  isPublished: Joi.boolean(),
}).min(1);

module.exports = {
  createTopicSchema,
  updateTopicSchema,
};