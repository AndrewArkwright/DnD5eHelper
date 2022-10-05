const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const characterRoutes = require('./routes/character')

require("dotenv").config({path: "./config/.env"});

// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))
// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
  
app.use('/', mainRoutes)
app.use('/character', characterRoutes)
 
app.listen(process.env.PORT, ()=>{
  console.log('Server is running, you better catch it!')
})

//npx tailwindcss -i ./public/src/style.css -o ./public/css/style.css --watch

/*

			<p>All of the information is based off of the information side of the D&D 5e handbook only. I do not own any of it and only own this website. All rolls are automatically randomized and done for you. If anything seems incorrect or if I should add something important, let me know <a href="https://aarkwright.netlify.app/">here</a></p>

			<section>
				<p>What is left for you to do:</p>
				<ol>
					<li>Choose your equipment from the choices I gave you and remember to adjust your AC appropriately (armor from equipment + dex modifier). Your DM may or may not allow you to use your gold before hand as well to purchase items. You can use this website to search for items and look up details about them: <a href="https://www.dndbeyond.com/equipment">here</a>.</li>
					<li>Write your background including your personality traits, ideals, bonds, and flaws. Based off of that information, choose two skill proficiencies, a tool proficiency, and possibly add related equipment. Consolt your DM regarding how many to choose/limitations. Example: Acolyte: Trait - I idolize a particular hero of my faith and constantly refer to that person's deeds and examples, Ideal - I hope to one day rise to the top of my faith's religious hierarchy, Bond - I owe my life to the priest who took me in when my parents died, Flaw - I judge others harshly and myself even more severly. Then your description would expand on these.</li>
					<li>Read your race and class traits. They will tell you how many cantrips/spells you need to choose. You can look up the spells and cantrips here: <a href="http://dnd5e.wikidot.com/spells">here</a>. It will also tell you if you have to make any other decisions like Dragonborn needing to choose what draconic ancestory they are apart of.</li>
					<li>Find out what to do when you level up</li>
				</ol>
			</section>

			<section>
				<p>Future updates:</p>
				<ol>
					<li>I plan on making it easier to choose equipment by most likely adding the list of equipment you can choose from.</li>
					<li>I plan on adding a way to search for the spells/skills that you can have to see details about them.</li>
					<li>Might add some general helpful information/links to help play.</li>
					<li>Might add information on how to level up each character or add the ability to have it done manually.</li>
					<li>>Might add a little text based game to test your character against enemies.</li>
					<li>Might be able to find a way to put the information on a character sheet that is printable.</li>
					<li>After the above, I will start to expand the info by adding stuff like races and classes.</li>
				</ol>
			</section>

			<section>
				<h1>Characters: </h1>
				<ul class="characterList">
				<% for(let i=0; i < data.length; i++) {%>
					<li class="char">
						<span><%= data[i].Race %></span>
						<span><%= data[i].Subrace %></span>
						<span><%= data[i].Class %></span>
					</li>
				<% } %>
			</section>
*/