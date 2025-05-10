const express = require('express');
const router = express.Router();
const productRouter = require('./productRouter');
const cartRouter = require('./cartRouter');
const userRouter = require('./userRouter');
const authRouter = require('./authRouter');
const passwordRouter = require('./passwordRouter');
const ticketRouter = require('./ticketRouter');

router.use("/carts", cartRouter);
router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/sessions", authRouter);
router.use("/password", passwordRouter);
router.use("/tickets", ticketRouter);

module.exports = router;