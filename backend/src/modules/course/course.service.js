const Course = require("./course.model");
const Category = require("../category/category.model");
const Topic = require("../topic/topic.model");
const mongoose = require("mongoose");
const ApiError=require("../../utils/ApiError");
const createCourse = async (data) => {
  const existingCourse = await Course.findOne({
    $or: [
      { title: data.title },
      { slug: data.slug },
    ],
  });

  if (existingCourse) {
    throw new Error("Course already exists");
  }

  const category = await Category.findById(data.category);

  if (!category) {
    throw new Error("Category not found");
  }

  return await Course.create(data);
};


const getCourses = async () => {
  return await Course.find()
    .populate("category", "name slug")
    .sort({ createdAt: -1 });
};


const getCourseById = async (id) => {
  const course = await Course.findById(id)
    .populate("category", "name slug");

  if (!course) {
    throw ApiError.notFound("Course not found");
  }

  return course;
};

const updateCourse = async (id, data) => {
  const course = await Course.findById(id);

  if (!course) {
     throw ApiError.notFound("Course not found");
  }

  if (data.category) {
    const category = await Category.findById(data.category);

    if (!category) {
 throw ApiError.notFound("Category not found");
    }
  }

  if (data.title || data.slug) {
    const duplicate = await Course.findOne({
      _id: { $ne: id },
      $or: [
        ...(data.title ? [{ title: data.title }] : []),
        ...(data.slug ? [{ slug: data.slug }] : []),
      ],
    });

    if (duplicate) {
      throw ApiError.conflict("Course title or slug already exists");
    }
  }

  Object.assign(course, data);

  return await course.save();
};


const deleteCourse = async (id) => {
  const course = await Course.findById(id);

  if (!course) {
    throw ApiError.notFound("Course not found");
  }

   await Topic.deleteMany({
    course: course._id,
  });


  await course.deleteOne();
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};