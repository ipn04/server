const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected Successfully");
    const port = process.env.PORT || 5000; 
    app.listen(port, () => console.log(`Server started ${port}`));
})
.catch((error) => console.log(error));

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, username, password: hashedPassword});
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
});
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "No User Data existed" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.SECRET_KEY, {
          expiresIn: '1h',
        });
        res.json({ message: "Success", token });
      } else {
        res.status(400).json({ message: "The password is incorrect" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
    }
  });
  
  const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: "Token is required for authentication" });
    }
  
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }
      req.user = user;
      next();
    });
  };
  
  app.get("/profile", authenticateToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ username: user.username, email: user.email });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving user", error });
    }
  });