const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
console.log("HomeRoute")

router.get('/', ensureAuth, characterController.getCharacters)

module.exports = router

