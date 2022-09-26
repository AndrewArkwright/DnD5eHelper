const express = require('express')
const router = express.Router()
const characterController = require('../controllers/character') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, characterController.getCharacters)

router.post('/createCharacter', characterController.createCharacter)

module.exports = router