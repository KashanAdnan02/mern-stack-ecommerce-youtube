import mongoose from "mongoose";

const connectDatabse = () => {
    mongoose.connect(process.env.MONGODB_URI)
        .then((res) => {
            console.log(`MongoDb Connected!`);
        }).catch((err) => {
            console.log(`MongoDb Disconnected!`);
        })
}


export default connectDatabse