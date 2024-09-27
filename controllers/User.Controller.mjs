import userModel from "../model/UserModel.mjs";
import hashPassword from '../utils/hashPassword.mjs'
import jwt from "jsonwebtoken"
import comparePassword from '../utils/comparePassword.mjs'

const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const emailExits = await userModel.findOne({ email })
        if (emailExits) {
            res.status(400).send({
                success: false,
                message: "Email Already Exits!"
            })
            return;
        }
        const hashedPassword = await hashPassword(password)
        const user = await userModel.create({
            name,
            email,
            phone,
            password: hashedPassword
        })
        res.status(201).send({
            success: true,
            messsage: 'User Register Succesffully!',
            user
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const emailExits = await userModel.findOne({ email })
        if (emailExits) {
            const isFound = await comparePassword(password, emailExits.password)

            if (isFound) {
                const token = jwt.sign({ id: emailExits._id }, process.env.JWT_SECRET)
                res.cookie("jwtToken", token)
                res.status(200).send({
                    success: true,
                    message: "User Logged In Succesfully!"
                })
            } else {
                res.status(401).send({
                    success: false,
                    message: "User Credentials is Incorrect!"
                })
            }
        } else {
            res.status(401).send({
                success: false,
                message: "User Credentials is Incorrect!"
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}
const profile = async (req, res) => {
    try {
        const { jwtToken } = req.cookies;
        jwt.verify(jwtToken, process.env.JWT_SECRET, async (error, decoded) => {
            if (decoded) {
                const { id } = decoded;
                const user = await userModel.findOne({ _id: decoded.id })
                console.log(user);
                res.status(200).send({
                    success: true,
                    user
                })
            } else {
                res.status(400).send({
                    success: false,
                    message: error
                })
            }
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}
const logoutUser = async (req, res) => {
    try {
        res.cookie = ""
        res.status(200).send({
            success: true,
            message: "User Logged Out!"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}


export default {
    registerUser,
    loginUser,
    profile,
    logoutUser
}