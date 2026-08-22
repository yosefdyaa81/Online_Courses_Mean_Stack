const User = require('./user.model.js');




const getme = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: "error fetching user",
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: { users },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: "error fetching users",
      error: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: "user not found",
      });
    }

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "invalid user ID",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const allowedFields = ['name', 'avatar', 'bio'];
    const updatedData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updatedData[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: "user not found",
      });
    }

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "error updating user",
      error: error.message,
    });
  }
};


const updateUserRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({
        status: 'fail',
        message: "role field is required",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: "user not found",
      });
    }

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "error updating user role",
      error: error.message,
    });
  }
};


const deleteMe = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { isActive: false },
      { new: true }
    );

    res.status(200).json({
      status: 'success',
      message: "Account has been disabled successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "Error while disabling account",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: "User not found",
      });
    }

    res.status(200).json({
      status: 'success',
      message: "User account has been disabled successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "Error while disabling user account",
      error: error.message,
    });
  }
};;

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  updateUserRole,
  deleteMe,
  deleteUser,
  getme
};