
document.addEventListener("DOMContentLoaded", async function () {
    const studentId = localStorage.getItem("studentId");
    if (!studentId) {
        alert("Student not logged in")
        return
    }
    const response = await fetch(`http://localhost:3000/api/users/${studentId}/courses`)
    if (response.ok) {
        const courses = await response.json()
        const tableBody = document.querySelector("#courseTable tbody");

        courses.forEach(course => {
            const row = document.createElement("tr")
            row.innerHTML = `
            <td>${course.courseName}</td>
            <td>${course.description}</td>
            <td>${course.subject}</td>
            <td>${course.credits}</td>
            <td><button onclick = "viewCourseDetails('${course._id}')">Details</button></td>
            `
            tableBody.appendChild(row)
        })
    } else {
        alert("Could not load courses")
    }
})

function viewCourseDetails(courseId) {
    window.location.href = `./details.html?id=${courseId}`;
}