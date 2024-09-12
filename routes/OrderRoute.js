import express from "express";
import { addOrUpdateOrderData, displayData } from "../functions/OrderFunc.js";

const router = express.Router();

router.post('/orderData', addOrUpdateOrderData)
router.post('/myOrderData', displayData)

export default router;