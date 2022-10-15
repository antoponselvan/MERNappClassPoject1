const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const PORT = process.env.PORT

app.use(express.json())


app.get('/', (req, res)=>{
    res.json("Hello World")
})

app.listen(PORT, ()=>{console.log("Listenting!")})