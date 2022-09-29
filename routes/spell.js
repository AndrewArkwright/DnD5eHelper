const express = require('express')
const router = express.Router()
const spellController = require('../controllers/spell')
console.log("SpellRoute")

router.post('/spellSearch', spellController.spellSearch)

module.exports = router