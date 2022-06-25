const {Schema,model} = require('mongoose');
const ProductSchema =  new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        require:true
    },
    stock:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
},{timestamps:true});
module.exports = model("Product", ProductSchema);
