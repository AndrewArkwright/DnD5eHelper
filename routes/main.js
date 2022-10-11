const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const mainController = require('../controllers/main')
const { ensureAuth, ensureGuest } = require('../middleware/auth')
console.log("MainRoute")

router.get('/', mainController.getIndex)
router.get("/passwordReset", authController.getReset) //get form to enter email
router.post("/passwordReset", authController.forgotPassword) //post to send email
router.get("/passwordReset/:token", authController.getResetForm) //get for link inside of email to enter in new password 
router.put("/passwordReset/:token", authController.resetPassword) //put to change password for user
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

module.exports = router