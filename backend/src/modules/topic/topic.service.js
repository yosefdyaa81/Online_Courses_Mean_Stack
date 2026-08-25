const Topic = require("./topic.model");
const Course = require("../course/course.model");
const ApiError=require("../../utils/ApiError");

const createTopic = async (data) => {
  const course = await Course.findById(data.course);

  if (!course) {
    throw ApiError.notFound("Course not found");
  }

  const existingTopic = await Topic.findOne({
    course: data.course,
    slug: data.slug,
  });

  if (existingTopic) {
    throw ApiError.conflict(
      "This topic already exists in this course"
    );
  }

  
  const topic = await Topic.create(data);

  return await topic.populate("course", "title slug");
};


const getTopics = async () => {
  return await Topic.find()
    .populate("course", "title slug")
    .sort({
      course: 1,
      order: 1,
    });
};


const getTopicsByCourse = async (courseId) => {
  const course = await Course.findById(courseId);

  if (!course) {
    throw ApiError.notFound("Course not found");
  }

  return await Topic.find({
    course: courseId,
  })
    .sort({ order: 1 });
};


const getTopicById = async (id) => {
  const topic = await Topic.findById(id)
    .populate("course", "title slug");

  if (!topic) {
    throw ApiError.notFound("Topic not found");
  }

  return topic;
};


const updateTopic = async (id, data) => {
  const topic = await Topic.findById(id);

  if (!topic) {
    throw ApiError.notFound("Topic not found");
  }

  if (data.course) {
    const course = await Course.findById(
      data.course
    );

    if (!course) {
      throw ApiError.notFound("Course not found");
    }
  }

  const courseId = data.course || topic.course;
  const slug = data.slug || topic.slug;

  const duplicate = await Topic.findOne({
    _id: { $ne: id },
    course: courseId,
    slug,
  });

  if (duplicate) {
    throw ApiError.conflict(
      "This topic already exists in this course"
    );
  }

  Object.assign(topic, data);

  return await topic.save();
};


const deleteTopic = async (id) => {
  const topic = await Topic.findById(id);

  if (!topic) {
    throw ApiError.notFound("Topic not found");
  }

  await topic.deleteOne();
};


module.exports = {
  createTopic,
  getTopics,
  getTopicsByCourse,
  getTopicById,
  updateTopic,
  deleteTopic
};