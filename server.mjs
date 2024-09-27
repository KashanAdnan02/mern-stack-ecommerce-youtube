import express from "express"
import dotenv from 'dotenv'
import ProductRoute from "./routes/Product.Routes.mjs"
import CategoryRoute from "./routes/Cateogry.Route.mjs"
import UserRoute from "./routes/User.Routes.mjs"
import cookieParser from "cookie-parser";
import connectDatabse from "./database/connectDatabse.mjs"
dotenv.config()
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use("/api/v1", UserRoute)
app.use("/api/v2", ProductRoute)
app.use("/api/v3", CategoryRoute)

connectDatabse()

app.listen(3000, () => {
    console.log(`Server is Running!`);
})