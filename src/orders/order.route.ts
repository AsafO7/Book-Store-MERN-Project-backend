import express from 'express'
const router = express.Router()
const { createAOrder, getOrderByEmail } = require('./order.controller');

// create order endpoint
router.post("/", createAOrder);

// get orders by user email 
router.get("/email/:email", getOrderByEmail);

module.exports = router;