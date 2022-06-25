const Product = require('../models/product');

const createProduct = async (req,res)=>{
    const {name,description,stock,amount}  = req.body;

    try {
    const newProduct = new Product({
        name,
        description,
        stock,
        amount
    });
    newProduct.save();
    return res.status(200).json({
        succes:true,
        newNote: newProduct
    });
    } catch (error) {
        return res.status(500).json({
            success:false,
            error: error.message
        });
        
    }
}
const getProduct = async(req,res)=>{ 
    const {productId} = req.params;
    try {
        const product = await Product.findById({_id:productId});
        return res.status(200).json({
            success:true,
            product: product 
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            error: error.message
        });  
    }

}

const getProducts =async(req,res)=>{
    try {
        const product = await Product.find();
        return res.status(200).json({
            success:true,
            product
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            error: error.message
        });
    }
    
}
const updateProduct = async(req,res) =>{
    const {productId} = req.params;
    try {
        const product = await Product.findByIdAndUpdate(
            {_id:productId},
            req.body,
            {
                new:true,
            }
            );
            return res.status(200).json({
                success:true,
                product
            });
    } catch (error) {
        return res.status(500).json({
            success:false,
            error: error.message
        });
        
    }
    
}

const deleteProduct = async(req,res)=>{
    const {productId} = req.params;
    console.log(productId);
    try {
        const product = await Product.findByIdAndDelete({_id:productId});
        return res.status(200).json({
            success:true,
            product
    });
    } catch (error) {
        return res.status(500).json({
            success:false,
            error: error.message
        });
    }
}

module.exports= {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct

}