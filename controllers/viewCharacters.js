const char = require('../models/character')

module.exports = {
    getCharacters: async (request, response) => {
        try{
            console.log(request.user.id)
            const characterList = await char.find({User: request.user.id}) //char is from the first line in this document since Model should be the only thing contacting the DB, gets stuck here
            response.render('viewCharacters.ejs', {data: characterList})
        }catch(err){
            console.log(err)
        }
    }
}