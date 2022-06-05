const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const MongoClient = require("mongodb").MongoClient

const app = express()
app.set('view engine', 'ejs') //tells express we are using ejs
app.use(bodyParser.urlencoded({extended: true}))
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

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html")
})

app.post('/findSpell', (request,response) => { //use this for getting info for spells or whatever, should be post because we need to gather data
    const spellName = request.body.spell.toLowerCase().split(" ").join("-") //request.body is not a string
    console.log("Searching API for spell:",spellName)
    const url = `https://api.open5e.com/spells/${spellName}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            response.render("index.ejs", {spell: data})
        })
        .catch(error => console.log(`Error:${error}`))
})

app.listen(PORT, () =>{
    console.log(`The server is running on port ${PORT}!`)
})