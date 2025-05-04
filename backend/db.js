const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://imeza2:courses@courses.dliacvc.mongodb.net/?retryWrites=true&w=majority&appName=Courses"); {
    useNewParser: true;
}

module.exports = mongoose;