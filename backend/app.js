const express = require("express");
const router = express.Router();
const app = express()
var cors = require("cors");
const secret = "supersecret"
const bodyParser = require("body-parser")
const jwt = require("jwt-simple")
const User = require("./users")
const Course = require("./course")

app.use(cors())
app.use(bodyParser.json())

// user
router.post("/user", async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status.json({ error: "Missing username or password" })
        return
    }
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    })
    try {
        await newUser.save()
        console.log(newUser)
        res.sendStatus(201)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

// login
router.post("/auth", async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({ error: "Missing username or password" })
        return
    }
    let user = await User.findOne({ username: req.body.username })
    
    if (!user) {
        res.status(401).json({error: "Bad Username"})
    }
    else {
        if (user.password != req.body.password) {
            res.status(401).json({error: "Bad Password"})
        }
        else {
            username2 = user.username
            const token = jwt.encode({ username: user.username }, secret)
            const auth = 1

            res.json({
                username2,
                token: token,
                auth: auth
            })
        }
    }
    
})

// check if token is valid
router.get("/user-validate", async (req, res) => {
    if (!req.headers["x-auth"]) {
        return res.status(401).json({ error: "Missing X-Auth" })
    }
    const token = req.headers["x-auth"];
    try {
        const decoded = jwt.decode(token, secret);
        const username = decoded.username;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({error: "User not found"})
        }
        res.json({success: true, username})
    } 
    catch (err) {
        res.status(401).json({error: "Invalid token"})
    }
})

// get all courses
router.get("/courses", async (req, res) => {
    try {
        const courses = await Course.find({})
        res.send(courses)
    }
    catch (err) {
        console.log(err)
    }
})

// single course 
router.get("/courses/:id", async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
        res.send(course)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

// add course 
router.post("/courses", async (req, res) => {
    try {
        const course = new Course(req.body)
        await course.save()
        res.status(201).json(course)
    }
    catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})

//update course
router.put("/courses/:id", async (req, res) => {
    try {
        const course = req.body
        await Course.updateOne({ _id: req.params.id}, course)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

router.delete("/courses/:id", async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
        await Course.deleteOne({ _id: course._id })
        res.sendStatus(204)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

app.use("/api", router)
app.listen(3000, () => {
    console.log("server is running on http://localhost:3000");
});