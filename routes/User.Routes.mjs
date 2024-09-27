import express from "express";
import UserController from "../controllers/User.Controller.mjs"
const router = express.Router()

router.post("/register", UserController.registerUser)
router.post("/login", UserController.loginUser)
router.get("/me", UserController.profile)
router.get("/logout", UserController.logoutUser)

export default router
