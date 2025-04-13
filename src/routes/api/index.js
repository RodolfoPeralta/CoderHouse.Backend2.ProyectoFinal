const express = require('express');
const router = express.Router();
const productRouter = require('./productRouter');
const cartRouter = require('./cartRouter');
const userRouter = require('./userRouter');
const authRouter = require('./authRouter');

router.use("/carts", cartRouter);
router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/sessions", authRouter);

module.exports = router;