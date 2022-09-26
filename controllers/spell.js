module.exports = {
    spellSearch: (req,res)=>{
        res.render('spell.ejs')
    }
}

/*
createTODO: async (req, res)=>{
    try{
        await Todo.create({todo: req.body.todoItem, completed: false})
        console.log('Todo has been added!')
        res.redirect('/todos')
    }catch(err){
        console.log(err)
    }
},


app.get('/spell',async (request, response)=>{
    const characterList = await db.collection('characterList').find().toArray()
    response.render('spell.ejs', {spell})
})

app.post('/findSpell',async (request,response) => { //use this for getting info for spells or whatever, should be post because we need to gather data
    const characterList = await db.collection('characterList').find().toArray()
    const spellName = request.body.spell.toLowerCase().split(" ").join("-") //request.body is not a string
    console.log("Searching API for spell:",spellName)
    const url = `https://api.open5e.com/spells/${spellName}`
    fetch(url)
        .then(response => response.json())
        .then(spell => {
            console.log(spell)
            response.render('spell.ejs', {spell}) //go to a different file and render the info or try to use EJS partials?***************
        })
        .catch(error => console.log(`Error:${error}`))
    })
*/