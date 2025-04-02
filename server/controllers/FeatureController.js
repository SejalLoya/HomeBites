const User = require('../models/User');

//FETCH USER ROUTE
exports.fetchUser = async(req,res) => {
    const id = req.id;
    try {
        const user = await User.findById(id).select("-password");
        if(!user) {
            return res.status(400).json({success: false, message: "Please Signup first!"});
        }
        return res.status(200).json({success: true, user});
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}

//ADD TO FAVOURITES ROUTE
exports.addToFavourites = async(req, res) => {
    const {id} = req.params;        //user's id 
    const favourite = req.body;     //post's body - idMeal, title and image
    try {
        let user = await User.findById(id);
        if(!user) {
            return res.status(404).json({success: false, message: "User not found"});
        }

        const existinfFavouriteList = user.favourites.some((fav) => fav.idMeal === favourite.idMeal);
        if(existinfFavouriteList) {
            return res.status(400).json({success: false, message: "This recipe already exists in the Favourites list"});
        }

        user.favourites = [...user.favourites, favourite];
        await user.save();
        return res.status(200).json({success: true, message: "Added to Favourites list"});
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}

//REMOVE FROM FAVOURITES ROUTE
exports.removeFromFavourites = async(req, res) => {
    const {id} = req.params;
    const favourite = req.body;
    try {
        let user = await User.findById(id);
        if(!user) {
            return res.status(404).json({success: false, message: "User not found"});
        }

        user.favourites = user.favourites.filter((fav) => fav.idMeal !== favourite.idMeal);
        await user.save();

        return res.status(200).json({success: true, message: "Recipe removed from Favourites list"});
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}


//GET FAVOURITES LIST ROUTE
exports.getFavourites = async(req,res) => {
    const {id} = req.params;

    try {
        let user = await User.findById(id);
        if(!user) {
            return res.status(404).json({success: false, message: "User not found"});
        }

        return res.status(200).json({success: true, favourites: user.favourites});
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}