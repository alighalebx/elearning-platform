import express from 'express';
import User from '../models/User';
import { validateUser } from '../utils/validate';

const createUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const userId = req.params.userId;
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, { firstName, lastName, email, password }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const userId = req.params.userId;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const UserController = {
  createUser,
  updateUser,
  deleteUser,
};

export default UserController;
