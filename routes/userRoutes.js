import express from 'express';
import { userController } from '../controller/userController.js';

export const router = express.Router();

router.post('/user', userController.createUser);
router.get('/user/:id', userController.getOneUser);
router.get('/user', userController.getUsers);
router.patch('/user', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);
