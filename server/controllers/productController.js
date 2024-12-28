import productModel from '../models/productModel.js'


class productController {


 static getProducts= async (req,res)=>{

  try {
    const products = await productModel.getProducts();

    if(!products){
        return res.status(404).json({message: "No products found"})
    }

    res.json(products);
    
  } catch (error) {
    console.log(error)
    res.status(500).json('Error',error)
  }
 

 }


}

export default productController;