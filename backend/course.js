const db = require("./db")

const Course = db.model("Course", {
    courseName: { type: String, required: true },
    description: { type: String, required: true },
    subject: { type: String, required: true},
    credits: { type: Number }
})

module.exports = Course