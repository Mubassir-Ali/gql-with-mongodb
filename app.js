const express =require("express")
const {graphqlHTTP}=require("express-graphql")
const schema = require("./Schema/schema")

const mongoose =require('mongoose')

const app =express()

// connect to the mlab database
mongoose.connect('mongodb+srv://ali:test123456@cluster0.1f0aa.mongodb.net/mdbData?retryWrites=true&w=majority')
mongoose.connection.once('open',()=>{
    console.log('connected to database')
})




app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(4000,()=>{
    console.log("now listning for request on port 4000")
})
