import { query } from "../config/db.js";

const productModel = {


    async getProducts(){
        const products = await query("SELECT * FROM productos");
        return products;
    }
}


export default productModel