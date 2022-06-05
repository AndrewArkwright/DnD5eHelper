const express = require("express")
const cors = require("cors")
const MongoClient = require("mongodb").MongoClient

const app = express()
app.use(cors())
const PORT = 8000

const character = {
    "nep":{
        'race': "Goddess",
    },
    "Unknown":{
        "Unknown": "unknown"
    }
}
//Class, Level, Background, Name, race, alignment, xp

//personality traits, ideals, bonds, flaws

//equipment (has 5 slots on it in the char sheet for something?)

//Armor Class, Initiave, speed
//HP and temp HP
//Hit dice total
//death save successes and failures (3 max on sheet?)

//Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma (major skills)
//Inspiration
//Proficiency bonus

//middle skill? Passive Wisdom(Perception)

/*Minor Skills
Acrobatics(Dex)
Animal Handling(Wisdom)
Arcana(int)
Athletics(str)
Deception(Cha)
History(int)
Insight(Wis)
Intimidation(Cha)
Investigation(Int)
Medicine(Wis)
Nature(Int)
Perception(Wis)
Performance(Cha)
Performance(Cha)
Religion(Int)
Sleight of Hand(Dex)
Stealth(Dex)
Survival(Wis)
*/

//level based info
//spells/attacks available for level
//feats and traints

app.get("/", (request, response)=>{
    response.sendFile(__dirname + "/index.html")
})

app.get('/api/:charName', (request,response)=>{
    const rappersName = request.params.charName.toLowerCase()
    if(character[charName]){
        response.json(character[charName])
    }else{
        response.json(character["Unknown"])
    }
})

app.listen(PORT, () =>{
    console.log(`The server is running on port ${PORT}!`)
})
//testing push