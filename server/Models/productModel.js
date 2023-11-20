const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    
    price:{
        type:String,
        require:true
    },
    
    decsription:{
        type:String,
        require:true
    },
    
    category:{
        type:String,
        required:true
    },
    stock:{
        type:String,
        required:true
    },
    image:{
        type:Array,
    },

},

{
    timestamps:true
}
)
module.exports=mongoose.model("product",productSchema)