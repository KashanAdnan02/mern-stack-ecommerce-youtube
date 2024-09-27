import category from "../model/Category.model.mjs"

const getAllCateogries = async (req, res) => {
    try {
        const getAllCategories = await category.find({})
        res.status(200).json({
            success: true,
            getAllCategories
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const createCategory = async (req, res) => {
    try {
        const body = req.body
        await category.create({
            category: body.category
        })
        res.status(200).json({
            success: true,
            message: "Catrgory Added Succesffully!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const updateCategory = async (req, res) => {

    try {
        const body = req.body;
        await category.findByIdAndUpdate({ _id: req.params.id }, { category: body.category })
        res.status(200).json({
            success: true,
            message: "Updated Succesfully!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.messsage
        })
    }
}
const delelteCategory = async (req, res) => {

    try {
        const { id } = req.params;
        await category.findByIdAndDelete({ _id: id })
        res.status(200).json({
            success: true,
            message: "Category Deleted Succesfully!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.messsage
        })
    }

}

const getSingleCategory = async (req, res) => {
    try {
        const data = await category.findById({ _id: req.params.id })
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.messsage
        })
    }
}

export default { getAllCateogries, createCategory, updateCategory, delelteCategory,getSingleCategory }