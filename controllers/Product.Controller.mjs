import productModel from "../model/ProductModel.mjs";
import categoryModel from "../model/Category.model.mjs";

const getAllProducts = async (req, res) => {
    try {
        const data = await productModel.find({})
        res.status(200).send({
            success: true,
            message: "All Products",
            data
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const filterProduct = async (req, res) => {
    try {
        const { title, category } = req.query
        if (title) {
            const data = await productModel.find({
                "title": { $regex: title },
            })
            res.status(200).send({
                success: true,
                data,
            })
            return
        } else if (category) {
            const data = await productModel.find({
                "category": { $regex: category }
            })
            res.status(200).send({
                success: true,
                data,
            })
            return
        } else {
            res.status(200).send({
                success: true,
                mesage: "Cannot Filter Data",
            })

        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const createProduct = async (req, res) => {
    try {
        const { title, description, price, images, category } = req.body;
        const data = await productModel.create({
            title,
            description,
            price,
            images,
            category
        })
        res.status(201).send({
            success: true,
            message: "Created Product",
            data
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}
const productDelete = async (req, res) => {
    try {
        await productModel.findByIdAndDelete({ _id: req.params.id })
        res.status(200).send({
            success: true,
            message: "Product Deleted Successfully!"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        })
    }
}
const productUpdate = async (req, res) => {
    try {
        const body = req.body;
        const product = await productModel.findByIdAndUpdate({ _id: req.params.id }, { ...body }, { new: true });
        res.status(200).send({
            success: true,
            message: "Product Updated",
            product
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const getSingleProduct = async (req, res) => {
    try {
        const product = await productModel.findById({ _id: req.params.id })
        res.status(200).send({
            success: true,
            message: "Product",
            product
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const addRating = async (req, res) => {
    try {
        const { rating, user, comment } = req.body;
        let data = {
            rating,
            user,
            comment
        }
        const productFind = await productModel.findById({ _id: req.params.id });
        const arr = [
            ...productFind.reviews
        ]
        arr.push({ ...data })
        const ratingUpdate = await productModel.findByIdAndUpdate({ _id: req.params.id }, {
            reviews: arr
        })
        res.status(200).send({
            success: false,
            message: "Rated Succesfully!"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}


export default { createProduct, getAllProducts, getSingleProduct, productUpdate, productDelete, addRating, filterProduct }