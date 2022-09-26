const express = require('express')
const router = express.Router()
const characterController = require('../controllers/character')

router.get('/', characterController.getCharacters)
router.post('/createCharacter', characterController.createCharacter)

module.exports = router