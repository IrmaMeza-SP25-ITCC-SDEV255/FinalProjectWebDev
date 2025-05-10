
addEventListener("DOMContentLoaded", async function () {
    document.querySelector("#updateBtn").addEventListener("click", updateCourse)
    document.querySelector("#deleteBtn").addEventListener("click", deleteCourse)
    const urlparam = new URLSearchParams(window.location.search)
    const courseID = urlparam.get("id")
    const response = await fetch("http://localhost:3000/api/courses/" + courseID)

    if (response.ok) {
        let course = await response.json()
        document.querySelector("#courseId").value = course._id,
        document.querySelector("#courseName").value = course.courseName,
        document.querySelector("#description").value = course.description,
        document.querySelector("#subject").value = course.subject,
        document.querySelector("#credits").value = course.credits       
    }
})

async function updateCourse() {
    const courseID = document.querySelector("#courseId").value
    const course = {
        _id: document.querySelector("#courseId").value,
        courseName: document.querySelector("#courseName").value,
        description: document.querySelector("#description").value,
        subject: document.querySelector("#subject").value,
        credits: document.querySelector("#credits").value
    }
    const response = await fetch("http://localhost:3000/api/courses/" + courseID, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(course)
    })
    if (response.ok) {
        alert("Updated Course");
    }
    else {
        document.querySelector("#error").innerHTML = "Cannot update course"
    }
}

async function deleteCourse() {
    const courseID = document.querySelector("#courseId").value;
    const response = await fetch("http://localhost:3000/api/courses/" + courseID, {
        method: "DELETE"
    })
    if (response.ok) {
        alert("Course Deleted")
        window.location.replace("./index.html")
    }
    else {
        document.querySelector("#error").innerHTML = "Cannot delete course";
    }
}