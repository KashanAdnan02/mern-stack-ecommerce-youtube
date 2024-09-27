import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
    category: {
        required: true,
        type: String
    }
})


const categoryModel = mongoose.model("category", categorySchema)

export default categoryModel