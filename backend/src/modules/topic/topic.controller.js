const topicService = require("./topic.service");


const createTopic = async (req, res) => {
  const topic = await topicService.createTopic(
    req.body
  );

  res.status(201).json({
    status: "success",
    data: {
      topic,
    },
  });
};


const getTopics = async (req, res) => {
  const topics = await topicService.getTopics();

  res.status(200).json({
    status: "success",
    results: topics.length,
    data: {
      topics,
    },
  });
};


const getTopicsByCourse = async (req, res) => {
  const topics =
    await topicService.getTopicsByCourse(
      req.params.courseId
    );

  res.status(200).json({
    status: "success",
    results: topics.length,
    data: {
      topics,
    },
  });
};


const getTopicById = async (req, res) => {
  const topic = await topicService.getTopicById(
    req.params.id
  );

  res.status(200).json({
    status: "success",
    data: {
      topic,
    },
  });
};


const updateTopic = async (req, res) => {
  const topic = await topicService.updateTopic(
    req.params.id,
    req.body
  );

  res.status(200).json({
    status: "success",
    data: {
      topic,
    },
  });
};


const deleteTopic = async (req, res) => {
  await topicService.deleteTopic(
    req.params.id
  );

  res.status(204).send();
};

module.exports = {
  createTopic,
  getTopics,
  getTopicsByCourse,
  getTopicById,
  updateTopic,
  deleteTopic,
};