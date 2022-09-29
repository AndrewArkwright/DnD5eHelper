const express = require('express')
const router = express.Router()
const characterController = require('../controllers/character') 
const { ensureAuth } = require('../middleware/auth')
console.log("CharRoute")

router.get('/', ensureAuth, characterController.getCharacters) //We use / and not /character because we are already in /character at the moment when this is used

router.post('/createCharacter', characterController.createCharacter)

module.exports = router