const express = require('express')
const router = express.Router()
const spellController = require('../controllers/spell')

router.post('/spellSearch', spellController.spellSearch)

module.exports = router