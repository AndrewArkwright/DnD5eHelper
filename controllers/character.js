const character = require('../models/character')

module.exports = {
    getCharacters: async (req,res)=>{
        try{
            const characters = await character.find()
            //res.render('character.ejs', {INFO})
        }catch(err){
            console.log(err)
        }
    },
    createCharacter: async (req, res)=>{
        try{
            //await Todo.create({character: req.body.todoItem, completed: false})
            console.log('Character has been added!')
            res.redirect('/character')
        }catch(err){
            console.log(err)
        }
    }
}

/*
app.post('/makeChar', (request, response) => { // /addTodo is from the action in the form
    db.collection('characterList').insertOne({Race: request.body.Race, Subrace: request.body.Subrace, Class: request.body.Class}) //todoItem is from index.ejs name of input
    .then(result => {
        console.log('Character added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

    getTodos: async (req,res)=>{
        try{
            const todoItems = await Todo.find()
            const itemsLeft = await Todo.countDocuments({completed: false})
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft})
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            await Todo.create({todo: req.body.todoItem, completed: false})
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    }
*/