import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    review: {
        type: String,
        default: "0"
    },
    reviews: {
        type: Array,
    },
    category: {
        type: String,
        required: true
    }
}, { timestamps: true })

const productModel = mongoose.model("Products", productSchema)

export default productModel