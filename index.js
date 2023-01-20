const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = 3000


app.use(express.json({
    type: ['application/json', 'text/plain']
}))

app.use(cors())

mongoose.connect('mongodb+srv://saptarshi:saptarshi2001@cluster0.efe0pr1.mongodb.net/FormData?retryWrites=true&w=majority')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    city: String
})

const User = mongoose.model("User", userSchema)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

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

app.get('/user', (req,res)=>{
    User.find((err,item)=>{
        if(err){
            console.log(err)
        }else{
            res.send(item)
        }
    })
})

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