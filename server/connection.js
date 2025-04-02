const mongoose = require("mongoose");

const connectDb = async() => {
    try {
        const connection = await mongoose.connect(process.env.CONN_STRING);
        if(connection.STATES.connected) {
            console.log("MongoDB connected");
        }
        else {
            console.log("Connection failed");
        }
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {connectDb}
