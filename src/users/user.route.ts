import express from 'express'
const { authenticateAdmin } = require('./user.controller')

const router =  express.Router();

router.post("/admin", authenticateAdmin)

module.exports = router;