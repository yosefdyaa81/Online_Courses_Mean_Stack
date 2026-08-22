const Joi = require("joi");

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const courseIdParamSchema = Joi.object({
  courseId: Joi.string().pattern(objectIdPattern).required().messages({
    "string.pattern.base": "Invalid Course ID format",
    "any.required": "Course ID is required",
  }),
});

const challengeIdParamSchema = Joi.object({
  challengeId: Joi.string().pattern(objectIdPattern).required().messages({
    "string.pattern.base": "Invalid Challenge ID format",
    "any.required": "Challenge ID is required",
  }),
});

module.exports = {
  courseIdParamSchema,
  challengeIdParamSchema,
};