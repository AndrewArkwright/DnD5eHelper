const express = require('express')
const router = express.Router()
const characterController = require('../controllers/character') 
const { ensureAuth } = require('../middleware/auth')
console.log("CharRoute")

router.get('/', ensureAuth, characterController.getCharacters) //why not /character?

router.post('/createCharacter', characterController.createCharacter)

module.exports = router