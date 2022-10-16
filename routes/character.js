const express = require('express')
const router = express.Router()
const characterController = require('../controllers/character') 
const { ensureAuth } = require('../middleware/auth')
console.log("CharRoute")

router.get('/', ensureAuth, characterController.getCharacters) //We use / and not /character because we are already in /character at the moment

router.post('/', characterController.createCharacter)

router.delete("/deleteChar/:id", characterController.deleteCharacter);

module.exports = router