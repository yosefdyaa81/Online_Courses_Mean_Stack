const express = require('express');
const userRouter = express.Router();
const { getme, getAllUsers, getUserById,updateUser,deleteUser,updateUserRole,deleteMe} = require('./user.controller.js');
const { protect, restrictTo } = require('../../middlewares/auth.middleware.js');

userRouter.use(protect);

userRouter.patch('/me', updateUser);
userRouter.delete('/me', deleteMe);
userRouter.get('/me', getme);

userRouter.use(restrictTo('admin'));
userRouter.get('/:id', getUserById); 
userRouter.get('/', getAllUsers);
userRouter.patch('/:id/role', updateUserRole);
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;