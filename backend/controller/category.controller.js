import Category from "../models/category.js"

class CategoryController {

    static async getAllCategories (req, res){
        try {

            const categories = await Category.find()

            res.status(200).json({
                success: false,
                message: "Failed to retrieve categories",
                categories
            });
            
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to retrive categories",
                error: error.message
            })
        }
    }

}

export default CategoryController