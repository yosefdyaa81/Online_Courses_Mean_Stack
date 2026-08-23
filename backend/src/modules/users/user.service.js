const User = require('./user.model.js');
const ApiError = require('../../utils/ApiError');

const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw ApiError.notFound("User not found");
  }
  return user;
};

const getAllUsers = async () => {
  return await User.find();
};

const updateUser = async (userId, bodyData) => {
  const allowedFields = ['name', 'avatar', 'bio'];
  const updatedData = {};

  allowedFields.forEach((field) => {
    if (bodyData[field] !== undefined) {
      updatedData[field] = bodyData[field];
    }
  });

  const user = await User.findByIdAndUpdate(userId, updatedData, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return user;
};

const updateUserRole = async (userId, role) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return user;
};

const disableUser = async (userId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { isActive: false },
    { new: true }
  );

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return user;
};

module.exports = {
  getUserById,
  getAllUsers,
  updateUser,
  updateUserRole,
  disableUser,
};