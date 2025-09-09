import express from 'express';
import { googleLogin, login, logout, register } from '../controllers/authController.js';



const authRouter = express.Router();

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
authRouter.post('/google',googleLogin)

export default authRouter;