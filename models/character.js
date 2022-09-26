const mongoose = require('mongoose')


const TodoSchema = new mongoose.Schema({
    race: {
      type: String,
      required: true,
    },
    subRace: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    }
})
  
module.exports = mongoose.model('Todo', TodoSchema)
