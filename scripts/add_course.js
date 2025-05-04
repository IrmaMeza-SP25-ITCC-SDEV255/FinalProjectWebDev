addEventListener("DOMContentLoaded", function () {
    document.querySelector("#addBtn").addEventListener("click", addCourse);
})

async function addCourse(event) {
    event.preventDefault();
    const course = {
        courseName: document.querySelector("#courseName").value,
        description: document.querySelector("#description").value,
        subject: document.querySelector("#subject").value,
        credits: document.querySelector("#credits").value,
    }
    const response = await fetch("http://localhost:3000/api/courses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(course)
    });
    if (response.ok) {
        const results = await response.json();
        alert("Course added!");
        document.querySelector("form").reset();
    }
    else {
        document.querySelector("#error").innerHTML = "Cannot add course"
    }
}



