import express from 'express';
import { fetchUserData, login, registration } from '../controller/user.controller.js';
import jwtAuth from '../middelware/jwtAuth.js';

const userRouter = express.Router();

userRouter.post('/register', registration);
userRouter.post('/login', login)
userRouter.get('/fetchuserdata', jwtAuth, fetchUserData)

export default userRouter;