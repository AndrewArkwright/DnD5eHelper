const char = require('../models/character')

module.exports = {
    getCharacters: async (request, response) => {
        try{
            const characterList = await char.find() //char is from the first line in this document since Model should be the only thing contacting the DB, gets stuck here
            response.render('viewCharacters.ejs', {data: characterList})
        }catch(err){
            console.log(err)
        }
    }
}