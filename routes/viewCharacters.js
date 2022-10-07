const express = require('express')
const router = express.Router()
const viewCharactersController = require('../controllers/viewCharacters') 
const { ensureAuth } = require('../middleware/auth')
console.log("viewCharRoute")

router.get('/', ensureAuth, viewCharactersController.getCharacters) //why / and not /viewCharacters

module.exports = router