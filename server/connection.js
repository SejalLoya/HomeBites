const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.CONN_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        if (mongoose.connection.readyState === 1) {
            console.log("MongoDB connected successfully");
        } else {
            console.log("MongoDB connection failed");
        }
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1); // Exit process on failure
    }
};

module.exports = { connectDb };
