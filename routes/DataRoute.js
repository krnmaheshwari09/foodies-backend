import express from 'express';
import { displayData } from '../functions/DataFunc.js';

const router = express.Router();

router.get('/fooddata', displayData);

export default router