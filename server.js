const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const connectDB = require('./config/database')
const MongoClient = require("mongodb").MongoClient
let ejs = require('ejs');
const path = require("path")
const homeRoutes = require('./routes/home') //asks to get home route, will be characters for now
//const homeRoutes = require('./routes/spell') //asks to get spell route

require('dotenv').config({path: './config/.env'})

/**
@First - make homepage the character creator
@Second - make that mork with MVC and database
@Third - add extra functionality to that
@Fourth - maybe start adding extra pages
 */

const app = express()
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'));
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/', homeRoutes)
const PORT = 8000

connectDB()

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