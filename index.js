const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = 3000


app.use(express.json({
    type: ['application/json', 'text/plain']
}))

//Using Cors 
app.use(cors())

//Connencting to the database Mongo DB Atlas
mongoose.connect('mongodb+srv://saptarshi:saptarshi2001@cluster0.efe0pr1.mongodb.net/FormData?retryWrites=true&w=majority')

//Defining the Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    city: String
})

//Setting the model
const User = mongoose.model("User", userSchema)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//Getting data from the form and storing it into the database
app.post('/form', (req, res) => {
    let { name, email, city } = req.body

    const entry = new User({
        name: name,
        email: email,
        city: city
    })

    entry.save()
    
    res.send("Data Received")
})

//Fetching User data from the database 
app.get('/user', (req,res)=>{
    User.find((err,item)=>{
        if(err){
            console.log(err)
        }else{
            res.send(item)
        }
    })
})

//Searching user with MogoDB _id
app.get('/search/:id',(req,res)=>{
    User.findById({_id: req.params.id }, (err, item)=>{
        if(err){
            console.log(err)
        }else{
            res.send(item)
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})