const express = require('express')
const mongoose=require('mongoose')
const Progress=require('./models/progress.js')
const cors=require('cors')
const progress = require('./models/progress.js')
const app=express()
const port=3000
app.use(cors())
app.use(express.json())
main()
.then(()=>console.log("DB connected"))
.catch(err=>console.log(err))

async function main(){
    await mongoose.connect('mongodb+srv://mahadevj:RONIeJzcmlgQlc8I@cluster0.ayjoi8m.mongodb.net/fitness_tracker')
}
app.get('/',(req,res)=>{
    res.send("hello world")
})
app.post('/progress',async(req,res)=>{
    try{

        var userItem={
            
            weight:req.body.weight,
            date:req.body.date,
            
        }
        var user=new Progress(userItem)
        await user.save()
        res.status(201).json(user)
    }catch(error){
        console.error(error)
        res.status(500).json({error:error})

    }
})
app.get('/progress',async(req,res)=>{
    try{
        const users=await Progress.find({})
        res.status(200).json(users)
    }catch(error){
        console.error(error)
        res.status(500).json({error:error})

    }
})
app.delete('/progress',async(req,res)=>{
    try{
        const users=await Progress.deleteMany({})
            res.status(200).json(users)
    }catch(error){
        console.error(error)
        res.status(500).json({error:error})
        
    }
})
app.listen(port,()=>{
    console.log("server started")
})