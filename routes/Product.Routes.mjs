import express from "express";
import ProductController from "../controllers/Product.Controller.mjs"
const router = express.Router()

router.post("/product", ProductController.createProduct)
router.get("/", ProductController.getAllProducts)
router.get("/product/:id", ProductController.getSingleProduct)
router.put("/product/:id", ProductController.productUpdate)
router.delete("/product/:id", ProductController.productDelete)
router.put("/rating/:id", ProductController.addRating)
router.get("/search", ProductController.filterProduct)

export default router
