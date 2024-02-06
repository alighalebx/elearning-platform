import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();

router.post('/create', UserController.createUser);
router.put('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);

export default router;
