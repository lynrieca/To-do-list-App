const express = require('express'); //handle our api
const mongoose = require('mongoose'); //handle our database
const cors = require('cors'); 

//create express app
const app = express();

app.use(express.json()); //allow us to use content type of app json inside of our api
app.use(cors()); //stop any cross-origin errors we actually get

//                                          /databasename
mongoose.connect("mongodb://127.0.0.1:27017/mern-todo", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => console.log("Connected to DB")).catch(console.error);

//MODELS HERE
const Todo = require('./models/Todo');
//make a request to our localhost 3001/todos it will going to find our Todo which is connected to our mongoDB
app.get('/todos', async(req, res) => {
    const todos = await Todo.find();

    res.json(todos); 
});

//add new todo
app.post('/todo/new', (req,res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save();

    res.json(todo);
});

//delete todo
app.delete('/todo/delete/:id', async (req,res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
});

//update to complete to true/false(for insomnia/postman/restclient use PUT)
app.get('/todo/complete/:id', async(req,res) => {
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);
})

//to check if it is working
app.listen(3001, () => console.log("Server started on port 3001"));