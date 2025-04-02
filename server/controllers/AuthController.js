const User = require('../models/User')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

//SIGNUP ROUTE
exports.signup = async(req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({success: false, message: "User already exists! Please Login"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();
        return res.status(200).json({success: true, message: "Signup successful"});
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}

//LOGIN ROUTE
exports.login = async(req, res) => {
    let { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({success: false, message: "Please Signup"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }
        const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h',
        });

        //send this token in a encrypted cookie
        res.cookie("token", token, {
            httpOnly: true,
            expiresIn: new Date(Date.now() + 1000*60*60),     //expires after 1hr
        });

        return res.status(200).json({success: true, message: "Login Successful!", user});
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}

//LOGOUT ROUTE
exports.logout = async(req,res) => {
    try {
        res.cookie("token", "", {
            expires: new Date(Date.now()),
        });
        return res.status(200).json({success: true, message: "Logged out!"});
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}