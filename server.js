const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const MongoClient = require("mongodb").MongoClient
let ejs = require('ejs');
const path = require("path")
require('dotenv').config()

const app = express()
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'));
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
const PORT = 8000

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'characters'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.get('/',async (request, response)=>{
    const characterList = await db.collection('characterList').find().toArray()
    response.render('index.ejs', {data: characterList})
})

//does not work
/*
app.post('/findSpell',async (request,response) => { //use this for getting info for spells or whatever, should be post because we need to gather data
    const characterList = await db.collection('characterList').find().toArray()
    const spellName = request.body.spell.toLowerCase().split(" ").join("-") //request.body is not a string
    console.log("Searching API for spell:",spellName)
    const url = `https://api.open5e.com/spells/${spellName}`
    fetch(url)
        .then(response => response.json())
        .then(spell => {
            console.log(spell)
            response.render('index.ejs', {data: characterList}) //go to a different file and render the info or try to use EJS partials?***************
        })
        .catch(error => console.log(`Error:${error}`))


/*
        app.get('/', function (req, res) {
                    res.render('index', {
                        users: [{
                            name: `"${advice.slip.advice}",` + " Is your advice.."
                        }, ]
                    });
                });

                 <body>
      <div class="center">
        <ul id="users">
          <% users.forEach(function(user){ %>
            <%= user.name %>
          <% })%>
        </ul>
      </div>
      <div class="button_container">
})
*/

app.post('/makeChar', (request, response) => { // /addTodo is from the action in the form
    db.collection('characterList').insertOne({Race: request.body.Race, Subrace: request.body.Subrace, Class: request.body.Class}) //todoItem is from index.ejs name of input
    .then(result => {
        console.log('Character added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

//maybe do this on button click, but doing this for now


//use dropdowns to choose options. Should we have them all showing at once to choose, once you choose one, give a description of it below

//main race
// dragonborn, Dwarf, elf, gnome, halfling half-elf, half-orc, human, tiefling 

//subrace
// None, hill dwarf and mountain dwarf, high elf and woood elf and dark elf (drow), forest gnome and rock gnome, lightfoot halfling, stout halfling, none, none, none, none


//classes - barbarian, barb, cleric, druid, fighter, monk, paladin, ranger, rogue, sorcerer, warlock, wizard

//Class, Level, Background, Name, race, alignment, xp
//Roll for stats first 

//race -- size ---- speed
/*dwarf 
    traits-
    constitution +2
    size: 4-5 ft
    age - up to 350 years, still child at 50
    speed - 25 ft and not reduced by heavy armor
    vision - dark vision - 60ft
    resilience - advantage on saving throws for poison and extra defense for poison
    weapon proficiency - battleaxe, ahndaxe, light hammer, warhammer
    tool proficiency - choice of smith's tools, brewer's supplies, or mason tools
    language - dwarvish and common
    pick 1 subrace of below
    Hill dwarf - 
        Wisdom +1
        Hit point max increases by 1 and it increases by 1 every level
    Mountain dwarf - 
        strength +2
        Proficiency with light and medium armor
*/

/* ELF
        Dexterity +2
        Age - up to 750 years, reach maturity the same time as humans
        Size - 5-6 ft
        speed - 30 ft
        dark vision - can see in darkness within 60ft
        keen senses - proficiency in perfeption
        fey ancestry - have an advantage on saving throughs for being charmed and magic cannot put you to sleep
        Trance - Elves do not need to sleep and only need to deeply meditate for 4 hours a day (semi concious)
        language - elvish and common
        pick one subrace below
        high elf (gray elves or valley elves, sun elves, silvanesti, qualinesti, moon elves)
            Intelligence +1
            Proficiency with longsword, shortsword, shortbow, and longbow
            Learn one cantrip of choice and intelligence is your spellcasting ability
            Learn one extra language
        wood elf - (grugach, kagonesti)
            Wisdom +1
            proficiency in longsword, shortsword, shortbow, longbow
            speed is 35 ft instead of 30
            Mask of the wild - can attempt to hide even in light foliage, heavy rain, mist, etc
        
        dark elf (drow)
            Charisma +1
            Superior darkvision (120 ft instead of 60)
            sunlight sensitivity - disadvantage on attack rolls and Wisdom(perception rolls) that rely on site when whatever you are a attacking or perceiving is in direct sunlight
            drow magic - you know the dancing lights cantrip, when you reach 3rd level, you can cast the faerie fire spell once with this trait and regain the ability to do so when you have a long rest. When you reach 5th level, you can cast darkness spell once with this trait and regain the ability to do so during long rests, Charisma is your spellcasting ability for these
            proficiency with rapiers, shortswords, and hand crossbows
*/
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


//CRUD, we have a post, may need to change that to get if possible, but it seems like get is used for nav bar

//can use post to create a new character, have the person click button or something to make some choices, store in database for others to use?
//Get your character
//delete character

//if we keep the function in to delete and add, will need to make it so people have accounts