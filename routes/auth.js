const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Register Route
router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ message: "User already exists" }); // ✅ Instead of error, send success response
        }

        // Hash password with salt rounds
        const hashpassword = bcrypt.hashSync(password, 10);

        // Create and save a new user
        const user = new User({ email, username, password: hashpassword });
        await user.save();
        
        res.status(200).json({ message: "Sign up successful" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});


// Login Route
router.post("/signin", async (req, res) => {
    try {
        console.log("Incoming request body:", req.body); // ✅ Debugging

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            console.log("User not found, please sign up first."); // ✅ Log in console
            return res.status(200).json({ success: false, message: "Please sign up first" });
        }

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordCorrect) {
            console.log("Incorrect password."); // ✅ Log in console
            return res.status(200).json({ success: false, message: "Password is incorrect" });
        }

        const { password, ...userData } = user._doc;
        console.log("User signed in successfully:", userData); // ✅ Success log
        return res.status(200).json({ success: true, user: userData });
    } catch (error) {
        console.log("Signin error:", error); // ✅ Log error without breaking
        return res.status(200).json({ success: false, message: "Something went wrong" });
    }
});


module.exports = router;
