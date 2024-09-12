import express from 'express';
import { body } from 'express-validator';
import { createUser, loginUser } from '../functions/UserFunc.js';

const router = express.Router()

router.post('/createuser', [
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Password must contain minimum 5 characters').isLength({ min: 5 })
], createUser)

router.post('/loginuser', [
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Password must contain minimum 5 characters').isLength({ min: 5 })
], loginUser)

export default router