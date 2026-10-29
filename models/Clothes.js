const mongoose = require("mongoose")

const clothesSchema = new mongoose.Schema({
      imageAdress:{
        type: String

    },
     itemName:{
        type: String

    },
     forWomenOrMenOrKids:{
          type:String,
         enum:['Kids','Women','Men']


    },
    typeOfClothing:{
      type: String,
         enum:['Dresses','T-shirts','Pants','Two piece']


    },
   
    price:{
         type:Number


    },
    sizing:{
      type: String,
         enum:['S','M','L','XL']


    },

}, {timestamps:true})


const Clothes = mongoose.model('Clothes' , clothesSchema)

module.exports = Clothes


