const mongoose = require('mongoose')

console.log("Mongoose")
const tokenSchema = new mongoose.Schema({
    Token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      expires: 3600,
      default: Date.now
    },
})
  
module.exports = mongoose.model('token', tokenSchema)
