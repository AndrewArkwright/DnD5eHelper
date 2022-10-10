const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const mainController = require('../controllers/main')
const { ensureAuth, ensureGuest } = require('../middleware/auth')
console.log("MainRoute")

router.get('/', mainController.getIndex)
router.get("/passwordReset", authController.getReset)
router.post("/passwordReset", authController.forgotPassword)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

module.exports = router