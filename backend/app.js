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
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ error: "Missing username, password, or role" })
    }
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
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
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        return res.status(400).json({ error: "Missing username,password, or role" })
    }
    const user = await User.findOne({ username })
    
    if (!user) {
        return res.status(401).json({ error: "Bad Username" })
    }
    if (user.password !== password) {
        return res.status(401).json({ error: "Bad Password" })
    }
    if (user.role !== role) {
        return res.status(403).json({ error: "Wrong role" })
    }
        
    const token = jwt.encode({ username: user.username, role: user.role }, secret)

    const responsePayload = {
        username: user.username,
        token,
        role: user.role,
        auth: 1,
        studentId: user._id
    };
    res.json(responsePayload)
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
        const course = req.body;
        const result = await Course.updateOne({ _id: req.params.id }, course)
        console.log(course)
        res.sendStatus(204)
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

router.delete("/users/:studentId/courses/:courseId", async (req, res) => {
    const { studentId, courseId } = req.params;
    try {
        const student = await User.findById(studentId);
        if (!student) return res.status(404).send("Student not found")
        
        student.courses = student.courses.filter(id => id.toString() !== courseId)
        await student.save()

        res.sendStatus(204);
    }
    catch (err) {
        res.status(500).send("Error")
    }
})

router.post("/users/:id/courses", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user || user.role !== "student") {
            return res.status(403).json({ error: "Access denied" });
        }
        const { courseId } = req.body;
        if (!courseId) {
            return res.status(400).json({error: "Missing courseId"})
        }
        if (!user.courses.includes(courseId)) {
            user.courses.push(courseId)
            await user.save()
        }
        res.status(200).json({message: "Course added"})
    }
    catch (err) {
        console.log(err)
        res.status(500).json({error: "error"})
    }
})

router.get("/users/:id/courses", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("courses")
        if (!user || user.role !== "student") {
    return res.status(403).json({error: "Access denied"})
        }
        res.json(user.courses)
    } catch (err) {
        res.status(500).json({error: "error"})
    }
})

app.use("/api", router)
app.listen(3000, () => {
    console.log("server is running on http://localhost:3000");
});