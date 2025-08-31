import Product from "../models/product.js";


class ProductController {

    static async getProductByCategoryId(req, res) {

        const { categoryId } = req.params;

        try {

            const products = await Product.find({ category: categoryId });

            if (!products || products.length === 0) {
                return res.status(404).json({
                    success: false,
                    msg: "No Product Found"
                })
            }

        } catch (error) {

        }
    }

}

export default ProductController