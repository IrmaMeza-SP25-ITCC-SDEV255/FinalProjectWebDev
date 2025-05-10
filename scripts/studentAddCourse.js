document.addEventListener("DOMContentLoaded", async function () {
    const response = await fetch("http://localhost:3000/api/courses")
    if (response.ok) {
        const courses = await response.json();
        const dropdown = document.querySelector("#courseDropdown")

        courses.forEach(course => {
            const option = document.createElement("option");
            option.value = course._id;
            option.textContent = course.courseName;
            dropdown.appendChild(option)
        });
    } else {
        document.querySelector("#error").innerHTML = "Cannot load courses"
    }

    document.querySelector("#stu-addCourse").addEventListener("click", async function () {
        const selectedCourseId = document.querySelector("#courseDropdown").value;

        if (!selectedCourseId) {
            alert("Select a course")
            return;
        }
        const studentId = localStorage.getItem("studentId")
        if (!studentId) {
            alert("Student not logged in")
            return;
        }
        const result = await fetch(`http://localhost:3000/api/users/${studentId}/courses`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({courseId: selectedCourseId})
        })
        if (result.ok) {
            alert("Course added");
        }
        else {
            document.querySelector("#error").innerHTML = "Could not add course"
        }
    })

    document.querySelector("#stu-dropCourse").addEventListener("click", async function () {
        const selectedCourseId = document.querySelector("#courseDropdown").value;

        if (!selectedCourseId) {
            alert("Select a course");
            return
        }
        const studentId = localStorage.getItem("studentId");
        if (!studentId) {
            alert("Student not logged in")
            return
        }
        const result = await fetch(`http://localhost:3000/api/users/${studentId}/courses/${selectedCourseId}`, {
            method: "DELETE"
        })
        if (result.ok) {
            alert("Course dropped")
        }
        else {
            document.querySelector("#error").innerHTML = "Could not drop course"
        }
    })
})