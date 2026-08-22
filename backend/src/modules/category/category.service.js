const Category = require("./category.model");
const ApiError=require("../../utils/ApiError");

const createCategory = async (data) => {
  const existingCategory = await Category.findOne({
    $or: [
      { name: data.name },
      { slug: data.slug },
    ],
  });

  if (existingCategory) {
    throw ApiError.conflict("Category already exists");
  }

  return await Category.create(data);
};


const getCategories = async () => {
  return await Category.find().sort({ createdAt: -1 });
};


const getCategoryById = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw ApiError.notFound("Category not found");
  }

  return category;
};


const updateCategory = async (id, data) => {
  const category = await Category.findById(id);

  if (!category) {
    throw ApiError.notFound("Category not found");
  }

  if (data.name || data.slug) {
    const duplicate = await Category.findOne({
      _id: { $ne: id },
      $or: [
        ...(data.name ? [{ name: data.name }] : []),
        ...(data.slug ? [{ slug: data.slug }] : []),
      ],
    });

    if (duplicate) {
      throw ApiError.conflict("Category name or slug already exists");
    }
  }

  Object.assign(category, data);

  return await category.save();
};


const deleteCategory = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw ApiError.notFound("Category not found");
  }

  await category.deleteOne();

  return category;
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};