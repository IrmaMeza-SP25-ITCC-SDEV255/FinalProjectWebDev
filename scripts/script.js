
// inserts data into table 
addEventListener("DOMContentLoaded", async function () {
    const response = await fetch("http://localhost:3000/api/courses")
    const courses = await response.json()

    const tableBody = this.document.querySelector("#courseTable tbody")

    for (let course of courses) {
        const row = this.document.createElement("tr")
        row.innerHTML = `
        <td>${course.courseName}</td>
        <td>${course.description}</td>
        <td>${course.subject}</td>
        <td>${course.credits}</td>
        <td><a href = "edit_course.html?id=${course._id}"><button>Edit</button></a></td>
        <td><button onclick="viewDetails('${course._id}')">Details</button></td>
        `;
        tableBody.appendChild(row)
    }
});

function viewDetails(courseId) {
    window.location.href = `details.html?id=${courseId}`;
}