const char = require('../models/character')

module.exports = {
    getCharacters: async (request, response) => {
        try{
            const characterList = await char.find() //char is from the first line in this document since Model should be the only thing contacting the DB, gets stuck here
            response.render('character.ejs', {data: characterList})
        }catch(err){
            console.log(err)
        }
    },
    createCharacter: async (request, response)=>{
        try{
            /**
             * @updateSCHEMA
            */

            console.log(request.body.CharName)
            console.log(request.body.Alignment)

            //send as object?

            /************Things to do**************/
            /*
            Add this for spell classes - \nCharisma is your spellcasting ability for spells\nYour spell save DC = 8 + proficiency bonus = charisma modifier. Your spell attack modifier = proficiency bonus + charisma modifier.
            Adjust Schemas and verify it adds EVERYTHING to the db
            Add extra info (stuff at the bottom for what else they need to do and etc) at the end of ejs
            Add login
            */

            /************Things to do AFTER MVP**************/
            /*
            Make it look prettyish and mobile friendly
            Make disability friendly
            Remove certain options when an option is made. Like don't let me choose dark elf sub race after I chose human for main race
            Option to delete characters
            Option to reset password/email
            Character limits for textboxes?
            Make sure there are errors logging in if they do not meet the requirements
            */


            /*
            inspiration - given by DM

            AC - 10 + dex modifier, adding armor/clothing will change it from 10
            Initiative - dex mod

            Attacks/spells - need still, but may just note what spells are available and then to choose which one using spell finder

            equipment - may have to have dm help? pg 143 shows the starting gold each player has each classes starting amount, may 

            Personality traits - need 1 -- each one seems to have 2 skill proficiencies, a tool proficiency, and equipment related to that like a bard having a loot or theif with lockpick
            Ideals - need 1
            Bonds - need 1
            Flaws - need 1

            for spell people - school of magic? check other character pages behind main page in book

            All of the information is based off of the information side of the D&D 5e handbook only. I do not own any of it and only own this website. All rolls are automatically randomized and done for you. If anything seems incorrect or if I should add something important, let me know.

            What is left for you to do after filling out the form -
                -Choose your equipment from the choices I gave you and remember to adjust your AC appropriately (armor from equipment + dex modifier). Your DM may or may not allow you to use your gold before hand as well to purchase items. You can use this website to search for items and look up details about them: https://www.dndbeyond.com/equipment.
                -Write your background including your personality traits, ideals, bonds, and flaws. Based off of that information, choose two skill proficiencies, a tool proficiency, and possibly add related equipment. Consolt your DM regarding how many to choose/limitations. Example: Acolyte: Trait - I idolize a particular hero of my faith and constantly refer to that person's deeds and examples, Ideal - I hope to one day rise to the top of my faith's religious hierarchy, Bond - I owe my life to the priest who took me in when my parents died, Flaw - I judge others harshly and myself even more severly. Then your description would expand on these.
                -Read your race and class traits. They will tell you how many cantrips/spells you need to choose. You can look up the spells and cantrips here: http://dnd5e.wikidot.com/spells. It will also tell you if you have to make any other decisions like Dragonborn needing to choose what draconic ancestory they are apart of.
                -Find out what to do when you level up

            Future updates: 
                -I plan on making it easier to choose equipment by most likely adding the list of equipment you can choose from.
                -I plan on adding a way to search for the spells/skills that you can have to see details about them.
                -Might add some general helpful information/links to help play.
                -Might add information on how to level up each character or add the ability to have it done manually
                -Might add a little text based game to test your character against enemies.
                -Might be able to find a way to put the information on a character sheet that is printable.
                -After the above, I will start to expand the info by adding stuff like races and classes.
            */

//generate 6 Ability Score numbers
let abilityScoreArray = []

for(let i = 0; i < 6; i++) {
    let temp = []
    for(let i = 0; i < 4; i++) {
        temp.push(Math.ceil(Math.random() * 6))
    }

    temp = temp.sort((a, b) => a - b)
    console.log("Temp: ", temp)
    abilityScoreArray.push(temp[3] + temp[2] + temp[1])
    console.log("Ability Scores: ", abilityScoreArray)
}

//Assign ability score based on class, auto assigned based on info on table on page 12 for best ability and then auto assigned, also array is sorted where [0] is strength and [5] is charisma
abilityScoreArray = abilityScoreArray.sort((a, b) => b - a)
const abilityScoresConst = abilityScoreArray
console.log("All rolls before additions: ", abilityScoresConst)

let speed, weaponProf = [], toolProf = [];

if (request.body.Race === "Human") {
    abilityScoreArray = abilityScoreArray.map(value => value += 1)
    speed = 30

    let raceTraits = "Race traits:\nYou are of medium size and can live up to 100 years.\nYou can add one other langauge to your list of known languages."

    let language = ["Common"]
}
else if (request.body.SubRace === "Mountain Dwarf") {
    abilityScoreArray[0] += 2
    abilityScoreArray[2] += 2
    speed = 25

    let raceTraits = "Race traits:\nYou are of medium size and can live up to 350 years.\nDarkvision - You have superior vision in the darkness up to 60ft.\nYou have advantage on rolls against poison and poison damage.\nYou have advantage with rolls for stone history (intelligence).\nYou can choose to have tool proficiency with smith tools, brewer tools, or mason tools"

    weaponProf = ["battleaxe", "handaxe", "light hammer", "warhammer"]

    let language = ["Common", "Dwarven"]
}
else if (request.body.SubRace === "Hill Dwarf") {
    abilityScoreArray[2] += 2
    abilityScoreArray[4] += 1
    speed = 25

    let raceTraits = "Race traits:\nYou are of medium size and can live up to 350 years.\nDarkvision - You have superior vision in the darkness up to 60ft.\nYou have advantage on rolls against poison and poison damage.\nYou have advantage with rolls for stone history (intelligence).\nYou can choose to have tool proficiency with smith tools, brewer tools, or mason tools"

    weaponProf = ["battleaxe", "handaxe", "light hammer", "warhammer"]

    let language = ["Common", "Dwarven"]
}
else if (request.body.Race === "Dragonborn") {
    abilityScoreArray[0] += 2
    abilityScoreArray[5] += 1
    speed = 30

    let raceTraits = "Race traits:\nYou are of medium size, at least 6 feet tall, and weight around 250 pounds.\nYou take half damage from the element type of your chosen ancestry\nPlease choose your draconic ancestry using the chart at the following website and add the breath attack to your skills: https://www.dungeonsolvers.com/2018/04/04/best-draconic-ancestry/."

    let language = ["Common", "Draconic"]
}
else if (request.body.Race === "Half-Orc") {
    abilityScoreArray[0] += 2
    abilityScoreArray[2] += 1
    speed = 30

    let raceTraits = "Race traits:\nYou are of medium size and can live up to 75 years.\nDarkvision - You have superior vision in the darkness up to 60ft.\nYou are proficient with using the intimidation skill\nWhen you are reduced to 0 HP, you instead drop to 1 HP instead. This can only be used once until you have a long rest.\nWhen you score a critical hit with a melee weapon attack, you can roll one addition die of the weapon's damage die and add it to the critical damage."

    let language = ["Common", "Orc"]
}

else if (request.body.Race === "Half-Elf") {
    abilityScoreArray[0] += 2

    speed = 30

    let raceTraits = "Race traits:\nYou are of medium size and can live up to 180 years.\nAdd two ability score points to any of your scores.\nDarkvision - You have superior vision in the darkness up to 60ft.\nYou have advantage on saving throws against being charmed and magic cannot put you asleep.\nYou gain proficiency in two skills of your choice."

    let language = ["Common", "Elvish"]
}
else if (request.body.Subrace === "High Elf") {
    abilityScoreArray[1] += 2
    abilityScoreArray[3] += 1
    speed = 30

    let raceTraits = "Race traits:\nYou are of medium size and can live up to 700 years.\nDarkvision - You have superior vision in the darkness up to 60ft.\n You have advantage on saving throws when being charmed and you cannot be put to sleep by magic.\nYou do not sleep and instead you meditate deeply.\nYou can also add another language of your choosing to your list of languages and pick a wizard cantrip"

    weaponProf = ["longsword", "shortword", "longbow", "shortbow"]

    let language = ["Common", "Elven"]
}
else if (request.body.Subrace === "Wood Elf") {
    abilityScoreArray[1] += 2
    abilityScoreArray[4] += 1
    speed = 35

    let raceTraits = "Race traits:\nYou are of medium size and can live up to 700 years.\nDarkvision - You have superior vision in the darkness up to 60ft.\nYou have advantage on saving throws when being charmed and you cannot be put to sleep by magic.\nYou do not sleep and instead you meditate deeply.\nYou can attempt to hide even if you're only lightly obscured."

    weaponProf = ["longsword", "shortword", "longbow", "shortbow"]

    let language = ["Common", "Elven"]
}
else if (request.body.Subrace === "Dark Elf") {
    abilityScoreArray[1] += 2
    abilityScoreArray[5] += 1
    speed = 30

    let raceTraits = "Race traits:\nYou are of medium size and can live up to 700 years.\nSuperior Darkvision - You have superior vision in the darkness up to 120ft.\n You have advantage on saving throws when being charmed and you cannot be put to sleep by magic.\nYou do not sleep and instead you meditate deeply.\nYou have a disadvantage on perception checks that rely on sight when the thing you are perceiving is in direct sunlight.\nYou know the dancing light cantrip."

    weaponProf = ["rapiers", "shortswords", "hand crossbows"]

    let language = ["Common", "Elven"]
}
else if (request.body.Subrace === "Stout Halfling") {
    abilityScoreArray[1] += 2
    abilityScoreArray[2] += 1
    speed = 25

    let raceTraits = "Race traits:\nYou are around 3 feet tall, of size small, and can live up to 25 years.\nIf you roll a 1 on a d20 attack roll, ability check, or saving throw, you can reroll, but must choose the new roll\nYou have advantage for rolls against being frightened, against being poisoned, and against poison damage.\n"

    let language = ["Common", "Halfling"]
}
else if (request.body.Subrace === "Lightfoot Halfling") {
    abilityScoreArray[1] += 2
    abilityScoreArray[5] += 1
    speed = 25

    let raceTraits = "Race traits:\nYou are around 3 feet tall, of size small, and can live up to 25 years.\nIf you roll a 1 on a d20 attack roll, ability check, or saving throw, you can reroll, but must choose the new roll\nYou have advantage for rolls against being frightened.\nYou can attempt to hide behind creaturs of size medium."

    let language = ["Common", "Halfling"]
}
else if (request.body.Subrace === "Forest Gnome") {
    abilityScoreArray[1] += 1
    abilityScoreArray[3] += 2
    speed = 25

    let raceTraits = "Race traits:\n You are of size small, stand around 3 - 4 ft tall, are around 40 pounds, and live up to 500 years.\nDarkvision - You have superior vision in the darkness up to 60ft.\nYou have advantage with all Intelligence, Wisdom, and Charisma saving throws against magic.\nYou know the Minor Illusion cantrip and its' spell casting ability is Intelligence.\nSpeak with Small Beasts - through sounds and gestures, you can communication simple ideas with small beasts like moles and squirrels."

    let language = ["Common", "Gnomish"]
}
else if (request.body.Subrace === "Rock Gnome") {
    abilityScoreArray[3] += 2
    abilityScoreArray[2] += 1
    speed = 25

    let raceTraits = "Race traits:\n You are of size small, stand around 3 - 4 ft tall, are around 40 pounds, and live up to 500 years.\nDarkvision - You have superior vision in the darkness up to 60ft.\nYou have advantage with all Intelligence, Wisdom, and Charisma saving throws against magic.\nArtificier's Lore - whenever you make an Intelligence(history) check, you can add twice your proficiency bonus instead of any proficiency bonus you would normally add.\nTinker - Using artisan tools, you can spend 1 hour and 10 gp of materials to contruct a Tiny clockwork device (AC of 5 with 1 HP). The device stops functioning after 24 hours unless you spend an hour repairing it. You can also reclain the materials to make it if you decide to dismantle it. You can have up to three devices at a time. You can choose to make a clockwork device of these types: clockwork toy that represents a animal, monster, or person that moves 5ft each turn in a random direction. It also makes noises appropriate to the creature it represents, a fire starter that produces a miniature flame which can be used to light things. It requires an action to use, or a music box that will play music at a moderate volume when opened or stops when closed."

    toolProf = toolProf.concat(["artisan tools"])

    let language = ["Common", "Gnomish"]
}
else if (request.body.Race === "Tiefling") {
    abilityScoreArray[3] += 1
    abilityScoreArray[5] += 2
    speed = 30

    let raceTraits = "Race traits:\nYou are of size medium and live a little past 100 years.\nDarkvision - You have superior vision in the darkness up to 60ft.\nYou take half damage from fire damage.\nYou know the thaumaturgy cantrip."

    let language = ["Common", "Infernal"]
}

console.log("Race increase: ", abilityScoreArray)

//Make adjustments per class

let gp = 0

if (request.body.Class === "Paladin") {

    let temp = []
    temp[0] = abilityScoreArray[0]
    temp[1] = abilityScoreArray[2]
    temp[2] = abilityScoreArray[1]
    temp[3] = abilityScoreArray[4]
    temp[4] = abilityScoreArray[5]
    temp[5] = abilityScoreArray[3]
    abilityScoreArray = temp

    let armorProf = ["all armor", "shields"]
    weaponProf = weaponProf.concat(["simple weapons", "martial weapons"])
    let savingThrows = ["Wisdom", "Charisma"]
    let classTraits = "Class traits:\nChoose two proficiencies: Athletics, Insight, Intimidation, Medicine, Persuations, or Religion.\nDivince Sense - until the end of your next turn, you known the location of any celestial, fiend, or undead within 60 feet of you that is not behind total cover. You also know its' type, but not identity. You can also detect any place or object that has been consecrated or desecrated. You can use this feature a number of times equal to 1 + your Charisma modifier and it is reset after a long rest.\nLay On Hands: You can restore a total number of hit points eqaul to your paladin level x 5. As an action, you can touch a creature and draw power from the pool of healing power that you have to restore a number of hit points to that creature up to you max. Alternatively, you can spend 5 hit points from your pool of healing to cure the target of one disease or neutralize one poison. You can cure multiple diseases and neutralize multiple poisons as long as you have enough points in your pool. This feature has no effect on undead or constructs."

    for(let i = 0; i < 4; i++) {gp += Math.ceil(Math.random() * 4)}
    gp *= 10

    let equipment = ["martial weapon and a shield or two martial weapons", "five javelins or simple melee weapon", "priest's pack or exmplorer's pack", "chain mail", "holy symbol", `Gold pieces: ${gp}`]
}
else if (request.body.Class === "Barbarian" || request.body.Class === "Fighter") {

    let temp = []
    temp[0] = abilityScoreArray[0]
    temp[1] = abilityScoreArray[1]
    temp[2] = abilityScoreArray[2]
    temp[3] = abilityScoreArray[4]
    temp[4] = abilityScoreArray[5]
    temp[5] = abilityScoreArray[3]
    abilityScoreArray = temp

    if (request.body.Class === "Barbarian") {
        let armorProf = ["light armor", "medium armor", "shields"]
        weaponProf = weaponProf.concat(["simple weapons", "martial weapons"])
        let classTraits = "Class traits:\nChoose two proficiencies: Animal Handling, Athletics, Intimidation, Nature, Perception, or Survival\nWhile you're not wearing any armor, your AC equals 10 + dexterity modifier + constitution modifier.\nRage: can enter rage as a bonus action. You gain the following benefits if you are not wearing heavy armor: you have advantage on Strength checks and Strength Saving throws, when you attack with a melee weapon, you gain a bonus to the damage rolls that increases as you level up (+2 for now), you have resistance to bludgeoning, piercing, and slashing damage. You cannot cast spells while raging and it lasts for one minute. It can end early if you are knocked unconcious, your turn ends without attacking a hostile creature, or you haven't taken damage since then. You can only rage twice at level one without having a long rest."
        let savingThrows = ["Strength", "Constitution"]

        for(let i = 0; i < 2; i++) {gp += Math.ceil(Math.random() * 4)}
        gp *= 10

        let equipment = ["greataxe or martial melee weapon", "two handaxes or any simple weapon", "explorer's pack", "4 javelins", `Gold pieces: ${gp}`]
    }

    else {
        let armorProf = ["all armors", 'shields']
        weaponProf = weaponProf.concat(["simple weapons", "martial weapons"])
        let savingThrows = ["Strength", "Constitution"]
        let classTraits = ["Class traits:\nChoose two proficiencies: Acrobatics, Animal Handling, Athletics, History, Insight, Intimidation, Perception or Survival.\nSecond Wind - on your turn, you can take a bonus action and regain 1d10 + current level health. In order to use this feature again, you must have a short or long rest.\nChoose a fighting style. You can use this website to browse the fighting styles and bonuses they give you: http://dnd5e.wikidot.com/fighter."]

        for(let i = 0; i < 5; i++) {gp += Math.ceil(Math.random() * 4)}
        gp *= 10

        let equipment = ["chain mail or leather armor, a long bow, and 20 arrows", "martial weapon and a shield or two martial weapons", "light crossbow with 20 bolts or two hand axes", "dungeoneer's pack or explorer's pack", `Gold pieces: ${gp}`]
    }
}
else if (request.body.Class === "Monk" || request.body.Class === "Ranger") {

    let temp = []
    temp[0] = abilityScoreArray[3]
    temp[1] = abilityScoreArray[0]
    temp[2] = abilityScoreArray[2]
    temp[3] = abilityScoreArray[5]
    temp[4] = abilityScoreArray[1]
    temp[5] = abilityScoreArray[4]
    abilityScoreArray = temp

    if (request.body.Class === "Monk") {
        let armorProf = ["none"]
        weaponProf = weaponProf.concat(["simple weapons", "shortswords"])
        let savingThrows = ["Strength", "Dexterity"]
        let classTraits = ["Class traits:\nChoose two proficiencies: Acrobatics, Athletics, History, Insight, Religion, or Stealth.\nWhile you have no armor or a shield, your AC eqauls 10 + your Dexterity modifier + your Wisdom modifier.\nMartial Arts - while you are not wearing armor, are not using a shield, are only using monk weapons (shortwords or any simply melee without heavy or two-handed property), or you are unarmed, you gain the following benefits: You can use Dexterity instead of Strength for attack and damage rolls of your unarmed strikes and monk weapons, you can roll a d4 in place of the normal damage of your unarmed strike or monk weapons. This die changes as you gain levels, When you use the attack action with an unarmed strike or monk weapon, you can take one unarmed strike as a bonus action."]
        let equipment = ["shortsword or any simple weapon", "dungeoneer's pack or explorer's pack", "10 darts", `Gold pieces: ${gp}`]

        for(let i = 0; i < 4; i++) {gp += Math.ceil(Math.random() * 4)}
    }

    else {
        let armorProf = ["light armor", "medium armor", "shields"]
        weaponProf = weaponProf.concat(["simple weapons", "martial weapons"])
        let savingThrows = ["Strength", "Dexterity"]
        let classTraits = "Class traits:\nChoose three proficiencies: Animal Handling, Athletics, Insight, investigation, Nature, Perception, Stealth, or Survival.\nFavorered Enemy - You have significant experience hunting, tracking, talking to, and studying a specific enemy. Choose a favored enemy: aberrations, beasts, celestials, constructs, dragons, elementals, fey, fiends, giants, monstrosities, oozes, plants, or undead. Alternatively, you can choose two humanoid races likes gnolls or orcs. You have advantage on Wisdom (Survival) checks to track your favored enemies as well as Intelligence checks to recall inforamtion about them. You can learn a language (if any) spoken by your enemy as well.\nNatural Explorer - you are familiar with one type of natural environment and are adept at traveling and surviing in it. Choose one of the following: artic, coast, desert, forest, grassland, mountain, swamp, or underdark. When you make a Intelligence or Wisdom check related to your favored terrain, your proficiency bonus is doubled if you are using a skill that you are proficient in. When traveling in for an hour in the favored terrain, you gain the following benefits: difficult terrain does not slow you groups travel, your group cannot become lost unless by magical means, you remain alert even if you are doing other activites while in the terrain like foraging, you can move stealthily alone at a normal pace, you find twice as much food when foraging, and while tracking creatures, you learn their exact numbers, sizes, and how long ago they passed through the area."

        for(let i = 0; i < 5; i++) {gp += Math.ceil(Math.random() * 4)}
        gp *= 10

        let equipment = ["scale mail or leather armor", "two shortswords or two simple melee weapons", "dungioneer's pack or explorer's pack", "longbow with a quiver of 20 arrows", `Gold pieces: ${gp}`]

    }
}
else if (request.body.Class === "Rogue") {

    let temp = []
    temp[0] = abilityScoreArray[2]
    temp[1] = abilityScoreArray[0]
    temp[2] = abilityScoreArray[1]
    temp[3] = abilityScoreArray[4]
    temp[4] = abilityScoreArray[5]
    temp[5] = abilityScoreArray[3]
    abilityScoreArray = temp

    let armorProf = ["light armor"]
    weaponProf = weaponProf.concat(["simple weapons", "hand crossbows", "longswords", "rapiers", "shortswords"])
    toolProf = toolProf.concat(["thieve's tools"])
    let savingThrows = ["Dexterity", "Intelligence"]
    let classTraits = ["Class traits:\nChoose four proficiencies: Acrobatics, Athletics, Deception, Insight, Intimidation, Investigation, Perception, Performance, Persuasion, Sleight of Hand, or Stealth.\nSneak Attack - you know how to strike subtly and exploit a foe's weakness. Once per turn, you can deal an extra 1d6 damage to one creature you hit with an attack if you have advantage on the attack roll. The attack must use a finesse or ranged weapon as well. You do not need advantage on the attack roll if another enemy of the target is within 5 feet of it, that enemy isn't incompacitated, and you don't have disadvantage. The extra damage you do is increased as you level up.\nThieve's Cant - secret mix of dialect, jargon, and code that allows you to hide messages in seemingly normal conversation. Only another creature that knows theive's cant understands such messages. It takes four times a long to convey the information using Thieve's cant than it would plainly. In addition, you understand a set of secret symbols and signs used to convey short and or simple messages like if it is dangerous, safe, or has loot."]

    for(let i = 0; i < 4; i++) {gp += Math.ceil(Math.random() * 4)}
    gp *= 10

    let equipment = ["rapier or shortsword", "shortbow and quiver of 20 arrows or shortsword", "burglar's pack or dungeoneer's pack or explorer's pack", `Gold pieces: ${gp}`]
}
else if (request.body.Class === "Wizard") {

    let temp = []
    temp[0] = abilityScoreArray[5]
    temp[1] = abilityScoreArray[4]
    temp[2] = abilityScoreArray[2]
    temp[3] = abilityScoreArray[0]
    temp[4] = abilityScoreArray[1]
    temp[5] = abilityScoreArray[3]
    abilityScoreArray = temp

    let armorProf = ["none"]
    weaponProf = weaponProf.concat(["daggers", "darts", "slings", "quarterstaffs", "light crossbows"])
    let savingThrows = ["Intelligence", "Wisdom"]
    let classTraits = ["Class traits:\nChoose two proficiencies: Arcana, History, Insight, Investigation, Medicine, or Religion.\nChoose three Wizard cantrips to learn.\nYou can choose 6 Wizard spells that you will put in your spellbook. You can add spells that you find to your spellbook. In order to learn that spell, it will take two hours and 50 gp for each level of that spell. You can copy spells that you know into other books and it will take only one hour and 10 gp per level in case you lose your spellbook.\nIntelligence is your spellcasting ability. Your spell save DC = 8 + proficiency bonus = Intelligence modifier. Your spell attack modifier = proficiency bonus + Intelligence modifier. You have a level two spell slot.\nIn order for you to cast spells, you must prepare them ahead of time. You can prepare a number of spells equal to your Intelligence modifier + your level. You can change your prepared spells every long rest and will take one minute per spell level for each spell.\nYOu can cast a wizard spell as a ritual without preparing it if that spell has the ritual tag and you have the spell in your spellbook."]

    for(let i = 0; i < 4; i++) {gp += Math.ceil(Math.random() * 4)}
    gp *= 10

    let equipment = ["quarterstaff or dagger", "component pouch or arcane focus", "scholar's pack or explorer's pack", "spellbook", `Gold pieces: ${gp}`]


}
else if (request.body.Class === "Cleric" || request.body.Class === "Druid") {

    let temp = []
    temp[0] = abilityScoreArray[5]
    temp[1] = abilityScoreArray[4]
    temp[2] = abilityScoreArray[2]
    temp[3] = abilityScoreArray[1]
    temp[4] = abilityScoreArray[0]
    temp[5] = abilityScoreArray[3]
    abilityScoreArray = temp

    if (request.body.Class === "Cleric") {
        let armorProf = ["light armor", "medium armor", "shields"]
        weaponProf = weaponProf.concat(["simple weapons"])
        let savingThrows = ["Wisdom", "Charisma"]
        let classTraits = "Class traits:\nChoose two proficiencies: History, Insight, Medicine, Persuasion, or Religion.\nYou can choose three cleric cantrips.\nYou have a level two spell slot for spellcasting.\nYou must choose a domain related to your deity: Knowledge, Life, Light, Nature, Tempest, Trickery, or War.\nBased on your domain, you will learn a domain spell and a skill. You can use this website to help find the spells based on the domain: http://dnd5e.wikidot.com/cleric."

        for(let i = 0; i < 5; i++) {gp += Math.ceil(Math.random() * 4)}
        gp *= 10

        let equipment = ["mace or warhammer (if proficient)", "scale armor, leather armor, or chain mail (if proficient)", "light crossbow with 20 bolts or any simple weapon", "preist's pack or explorer's pack", "shield", "holy symbol", `Gold pieces: ${gp}`]
    }
    else {
        let armorProf = ["light armor", "medium armor", "shields"]
        weaponProf = weaponProf.concat(["clubs", "daggers", "darts", "javelins", "maces", "quarterstaffs", "scimitars", "sickles", "slings", "spears"])
        let classTraits = "Class traits:\nChoose two proficiencies: Arcana, Animal Handling, Insight, Medicine, Nature, Perception, Religion, or Survival.\nYou cannot use armor or shields made of metal.\nYou know the secret langauge of Druidic.\nYou can choose two druid cantrips.\nYou have a level two skill slot for spellcasting"
        toolProf = toolProf.concat(["herbalism kit"])
        language.concat(["Druidic"])
        let savingThrows = ["Intelligence", "Wisdom"]

        for(let i = 0; i < 2; i++) {gp += Math.ceil(Math.random() * 4)}
        gp *= 10

        let equipment = ["wooden shield or simple weapon", "scimitar or simple melee weapon", "leather armor", "explorer's pack", "druidic focus", `Gold pieces: ${gp}`]
    }
}
else if (request.body.Class === "Warlock" || request.body.Class === "Bard" || request.body.Class === "Sorcerer") {
    let temp = []

    temp[0] = abilityScoreArray[5]
    temp[1] = abilityScoreArray[4]
    temp[2] = abilityScoreArray[3]
    temp[3] = abilityScoreArray[2]
    temp[4] = abilityScoreArray[1]
    temp[5] = abilityScoreArray[0]
    abilityScoreArray = temp

    if (request.body.Class === "Bard") {
        let armorProf = ["light armor"]
        weaponProf = weaponProf.concat(["simple weapons", "hand crossbows", "longswords", "shortswords", "rapiers"])
    
        let classTraits = "Class traits:\nChoose three musical instruments (tools) that you have proficiency with.\nChoose three skills that you have proficiencies with.\nYou can choose 2 bard cantrips and 4 bard spells that are the same level or lower than the highest level skillslot you have.\nYou have a level two spell slot for spellcasting.\nBardic inspiration - As a bonus action on your turn, choose a creature within 60ft other than yourself to inspire through words and or music. That creature gains a d6 bardic inspiration die. Once within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw. The die must be rolled before the DM says whether or not it fails or succeeds. The die is lost after it is used and a creature can only have one bardic die at a time."
    
        let savingThrows = ["Dexterity", "Charisma"]

        for(let i = 0; i < 5; i++) {gp += Math.ceil(Math.random() * 4)}
        gp *= 10
    
        let equipment = ["rapier, longsword, or a simple weapons", "diplomat's pack or entertainer's pack", "musical instrument of your choice", "leather armor", "dagger", `Gold pieces: ${gp}`]
    }

    else if (request.body.Class === "Sorcerer") {
        let armorProf = ["none"]
        weaponProf = weaponProf.concat(["daggers", "darts", "slings", "quarterstaffs", "light crossbows"])
        let savingThrows = ["Constitution", "Charisma"]
        let classTraits = "Class traits:\nChoose two proficiencies: Arcana, Deception, Insight, Intimidation, Persuasion, or Relgion.\nChoose 4 sorcerer cantrips to learn.\nYou also know two spells from the sorcerer spell list that are the same level or lower than the highest level skillslot you have. You can also replace one spell with another spell each time you level up.\nYou have a level two skill slot for spellcasting.\nCharisma is your spellcasting ability. Your spell save DC = 8 + proficiency bonus = charisma modifier. Your spell attack modifier = proficiency bonus + charisma modifier.\nEach time you gain a level, you can replace one spell you know with another one from your spell list.\nYou have the ability to use a arcane focus for spellcasting.\nChoose the origin of your magic: Draconic Bloodline - Draconic magic is mingled with your blood and is commonly received by people making deals with dragons or having draconic ancestory. Wild Magic - your magic comes from the chaos that underlie the order of creation. People have gained this power by being exposed to raw magic, being blessed by fey, or being makred by a demon. Rarely it can be a rare fluke as well.\nIf you chose Draconic Bloodline, add Draconic to your known languages and choose a draconic ancestry using the website: https://roll20.net/compendium/dnd5e/Draconic%20Bloodline#content. Your proficiency is doubled for Charisma checks when interacting with dragons, increase your HP by one each time you level up, and when you are not wearing armor, your AC is equal to 13 + your Dexterity modifier because of your scaley skin. If you chose Wild Magic, once per turn, the DM may have you roll a D20 after you cast a spell due to a Wild Magic Surge. If you roll 1, you must roll a d100 for the Wild Magic Surge table. If it is a spell, it is too wild to affect your Metamagic. If it normally requires concentration, it does not in this case. Spells will last the full duration. Tides of Chaos - You can manipulate the forces of chaos to gain advantage on an attack roll, ability check, or saving throw. You regain this feature each time you have to roll on the Wild Magic Surge table or after a long rest."

        for(let i = 0; i < 3; i++) {gp += Math.ceil(Math.random() * 4)}
        gp *= 10

        let equipment = ["light crossbow with 20 bolts or any simple weapon", "component pouch or arcane focus", "dungeoneer's pack or explorer's pack", "two daggers", `Gold pieces: ${gp}`]
    }

    else {
        let armorProf = ["light armor"]
        weaponProf = weaponProf.concat(["simple weapons"])
        let savingThrows = ["Wisdom", "Charisma"]
        let classTraits = "Class traits:\nChoose two proficiencies: Arcana, Deception, History, Intimidation, Investigation, Nature, or Religion.\nOtherwordly Patron - You have struck a bargain with an otherwordly being of your choice: the Archfey, the Fiend, or the Great Old One. You can read about each one on the following website: http://dnd5e.wikidot.com/warlock. Make sure to add the level one spell associated with your patron and the two level one spells associated with your patron. For example, if you chose Archfey, you would learn Fey Presence, Faerie Fire, and Sleep.\nPick two cantrips to learn from the Warlock spell lists.\nCharisma is your spellcasting ability for spells\nYour spell save DC = 8 + proficiency bonus = charisma modifier. Your spell attack modifier = proficiency bonus + charisma modifier.\nYou can use an arcane focus.\nYou can choose two level one Warlock spells to learn as well. You have a level one skill slot for spellcasting. Each time you gain a level, you can replace one spell you know with another one from your spell list."

        for(let i = 0; i < 4; i++) {gp += Math.ceil(Math.random() * 4)}
        gp *= 10

        let equipment = ["light crossbow and 20 bolts or any simple weapon", "component pouch or arcane focus", "scholar's pack or dungeoneer's pack", "leather armor", "any simple weapon", "two daggers", `Gold pieces: ${gp}`]
    }
}

console.log("Adjust per class and final score: ", abilityScoreArray)

//Add race increases (request.body.Race and request.body.Subrace)
//strength - maountain dwarf +2 , dragonborn +2, half-orc +2, human +1
//dexterity - elf +2, halfling +2, forest gnome + 1, human + 1
//constitution - dwarf + 2, stout halfling +1, rock gnome +1, half orc + 1, human +1
//intelligence - high elf +1, gnome +2, tiefling +1, human +1
//wisdom - hill warf + 1, wood elf +1, human +1
//Charisma - half elf + 2, drow + 1, lightfoot halfling +1, dragonborn +1, human +1, tiefling+2

//Make modifiers
let abilityScoreMod = abilityScoreArray.map(value => Math.floor((value - 10)/2))

console.log("Ability Score Mods: ", abilityScoreMod)

let initiative = abilityScoreMod[1] //roll d20 and add initiative (dex modifier)

//HP calc

let hp, hitDice
if (request.body.Class === "Barbarian") {
    hp = Math.ceil(Math.random() * 12) + abilityScoreMod[2] 
    hitDice = 12
}
else if (request.body.Class === "Ranger" || request.body.Class === "Paladin" || request.body.Class === "Fighter") {
    hp = Math.ceil(Math.random() * 10) + abilityScoreMod[2]
    hitDice = 10
}
else if (request.body.Class === "Sorcerer" || request.body.Class === "Wizard") {
    hp = Math.ceil(Math.random() * 6) + abilityScoreMod[2]
    hitDice = 6
}
else {
    hp = Math.ceil(Math.random() * 8) + abilityScoreMod[2]
    hitDice = 8
}

console.log("HP: ", hp, "hit dice: ", hitDice)

//perception aka Wisdom, but various items and stuff may affect perception directly even though it is a skill of Wisdom
let perception = abilityScoreMod[4]

let profBonus = 2 //proficiency bonus determined by class and level, but all start with 2

//profBonus, raceTrait, classTrait, equipment, saving throws, weaponProf, armorProf, hp, hitDice, abilityScoreMod, abilityScoreArray, language, toolProf, speed, AC, ideals, bonds, flaws

            await char.create({Race: request.body.Race, Subrace: request.body.Subrace, Class: request.body.Class})
            console.log('Character has been added!')
            response.redirect('/')
        }catch(err){
            console.log(err)
        }
    },
}