

document.addEventListener("DOMContentLoaded", async function () {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("id")

    if (!courseId) {
        document.getElementById("error").textContent = "No course selected"
        return;
    }
    try {
        const response = await fetch(`http://localhost:3000/api/courses/${courseId}`)
        
        if (response.ok) {
            const course = await response.json();
            const container = document.getElementById("courseDetails")
            container.innerHTML = `
            <p>Course Name: ${course.courseName}</p>
            <p>Description: ${course.description}</p>
            <p>Subject: ${course.subject}</p>
            <p>Credits: ${course.credits}</p>
            `;
        } 
    } catch (err) {
        console.error(err)
        document.getElementById("error").textContent = "Could not load details"
    }
})