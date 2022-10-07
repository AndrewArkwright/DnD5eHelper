const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const characterController = require('../controllers/character')
console.log("HomeRoute")

router.get('/', ensureAuth, characterController.getCharacters)

module.exports = router