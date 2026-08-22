const express = require("express");

const topicController = require("./topic.controller");

const {
  createTopicSchema,
  updateTopicSchema,
} = require("./topic.validation");

const validate = require("../../middlewares/validate.middleware");
const {
  protect,
  restrictTo,
} = require("../../middlewares/auth.middleware");

const router = express.Router();


router.get(
  "/course/:courseId",
  topicController.getTopicsByCourse
);

router.get(
  "/",
  topicController.getTopics
);

router.get(
  "/:id",
  topicController.getTopicById
);

// Admin
router.post(
  "/",
  protect,
  restrictTo("admin"),
  validate(createTopicSchema),
  topicController.createTopic
);

router.patch(
  "/:id",
  protect,
  restrictTo("admin"),
  validate(updateTopicSchema),
  topicController.updateTopic
);

router.delete(
  "/:id",
  protect,
  restrictTo("admin"),
  topicController.deleteTopic
);

module.exports = router;