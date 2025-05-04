
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
        `;
        tableBody.appendChild(row)
    }
});