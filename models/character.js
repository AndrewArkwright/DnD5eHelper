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
    },
    Name: {
      type: String,
      required: true,
    },
    Alignment: {
      type: String,
      required: true,
    },
    raceTraits: {
      type: String,
      required: true
    },
    classTraits: {
      type: String,
      required: true
    },
    abilityScoreArray: {
      type: Array,
      required: true
    },
    abilityScoreMod: {
      type: Array,
      required: true
    },
    abilityScoresConst: {
      type: Array,
      required: true
    },
    hp: {
      type: Number,
      required: true
    },
    speed: {
      type: Number,
      required: true
    },
    profBonus: {
      type: Number,
      required: true
    },
    savingThrows: {
      type: Array,
      required: true
    },
    weaponProf: {
      type: Array,
      required: true
    },
    armorProf: {
      type: Array,
      required: true
    },
    language: {
      type: Array,
      required: true
    },
    toolProf: {
      type: Array,
      required: true
    },
    equipment: {
      type: Array,
      required: true
    },
    Traits: {
      type: String,
      required: true
    },
    Ideals: {
      type: String,
      required: true
    },
    Bonds: {
      type: String,
      required: true
    },
    Flaws: {
      type: String,
      required: true
    },
    Description: {
      type: String,
      required: true
    },
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
})
  
module.exports = mongoose.model('char', characterSchema)

/*

            await char.create({Race: request.body.Race, Subrace: request.body.Subrace, Class: request.body.Class, raceTrait: raceTrait, classTrait: classTrait, abilityScoreArray: abilityScoreArray, abilityScoreMod: abilityScoreMod, abilityScoresConst: abilityScoresConst, hp: hp, speed: speed, proficiencyBonus: profBonus, savingThrows: savingThrows, weaponProf: weaponProf, armorProf: armorProf, language: language, toolProf: toolProf, equipment: equipment, Traits: request.user.Traits, Ideals: request.user.Ideals, Bonds: request.user.Bonds, Flaws: request.user.Flaws, Description: request.user.Description, User: request.user.id})

*/