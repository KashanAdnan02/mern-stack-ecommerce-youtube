import express from "express";
import CategoryController from "../controllers/Category.Controller.mjs"
const router = express.Router()

router.post("/category", CategoryController.createCategory)
router.get("/", CategoryController.getAllCateogries)
router.get("/category/:id", CategoryController.getSingleCategory)
router.put("/category/:id", CategoryController.updateCategory)
router.delete("/category/:id", CategoryController.delelteCategory)

export default router
