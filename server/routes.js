const express = require("express");
const { signup, login, logout } = require("./controllers/AuthController");
const { fetchUser, getFavourites, addToFavourites, removeFromFavourites } = require("./controllers/FeatureController");
const { verifyToken } = require("./middlewares/VerifyToken");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello from server");
});


router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/fetch-user", verifyToken, fetchUser);


router.post("/add-to-favourites/:id", addToFavourites);
router.post("/remove-from-favourites/:id", removeFromFavourites);
router.get("/get-favourites/:id", getFavourites);
module.exports = router;