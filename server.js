// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const mongoose = require("mongoose")
const methodOverride = require('method-override')
const morgan = require('morgan')
const Clothes = require('./models/Clothes')






// Middleware
app.use(express.static('public')); //all static files are in the public folder
app.use(express.urlencoded({ extended: false })); // this will allow us to see the data being sent in the POST or PUT
app.use(methodOverride('_method'))
app.use(morgan('dev'))


async function conntectToDB() { //connection to the database
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    }
    catch (error) {
        console.log("Error Occured", error)
    }
}


conntectToDB()


















// Routes go here


app.get('/', (request, respones) => {
    respones.render('homepage.ejs')

})


app.get('/add-clothes/new', (request, respones) => {
    respones.render('add-clothes.ejs')

})


app.post('/add-clothes', async (request, respones) => {
    const createdClothes = await Clothes.create({
        imageAdress:request.body.imageAdress,
        itemName:request.body.itemName,
        forWomenOrMenOrKids:request.body.forWomenOrMenOrKids,
        typeOfClothing:request.body.typeOfClothing,
        price:request.body.price,
        sizing:request.body.sizing,
        
    })

    respones.redirect('/list-clothes')/////change to list page after creating the page
})


app.get('/list-clothes', async(request, respones) => {
   const allClothes = await Clothes.find()
   console.log(allClothes)
respones.render('list-of-all-clothes.ejs', {clothes: allClothes})


})

app.get('/list-clothes/:clothesId', async(request, respones) => {
    console.log(request.params.clothesId)
    const foundClothes = await Clothes.findById(request.params.clothesId)
    console.log(foundClothes)
   respones.render('clothes-details.ejs', {clothes:foundClothes})

})



app.delete('/list-clothes/:clothesId', async(request, respones) => {
    console.log('Delete item')
    await Clothes.findByIdAndDelete(request.params.clothesId)
    respones.redirect('/list-clothes')


})

app.get('/list-clothes/:clothesId/edit', async(request, respones) => {
    const foundClothes = await Clothes.findById(request.params.clothesId)
   respones.render('edit-clothes.ejs', {clothes:foundClothes})


})

app.put('/list-clothes/:clothesId', async(request, respones) => {
    const editClothes = await Clothes.findByIdAndUpdate(request.params.clothesId, request.body)
    respones.redirect('/list-clothes')


})











app.listen(3000, () => {
    console.log("Listening on port " + 3000)
}) // Listen on port 3000


