const mongoose = require('mongoose')

console.log("Mongoose")
const characterSchema = new mongoose.Schema({
    Race: {
      type: String,
      required: true,
    },
    Subrace: {
      type: String,
      required: false,
    },
    Class: {
      type: String,
      required: true,
    }
})
  
module.exports = mongoose.model('char', characterSchema)