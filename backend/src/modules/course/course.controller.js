const courseService = require("./course.service");

const createCourse = async (req, res) => {
  const course = await courseService.createCourse(req.body);

  res.status(201).json({
    status: "success",
    data: {
      course,
    },
  });
};

const getCourses = async (req, res) => {
  const courses = await courseService.getCourses();

  res.status(200).json({
    status: "success",
    results: courses.length,
    data: {
      courses,
    },
  });
};

const getCourseById = async (req, res) => {
  const course = await courseService.getCourseById(
    req.params.id
  );

  res.status(200).json({
    status: "success",
    data: {
      course,
    },
  });
};

const updateCourse = async (req, res) => {
  const course = await courseService.updateCourse(
    req.params.id,
    req.body
  );

  res.status(200).json({
    status: "success",
    data: {
      course,
    },
  });
};

const deleteCourse = async (req, res) => {
  await courseService.deleteCourse(req.params.id);

  res.status(204).send();
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};