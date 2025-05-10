let token;
window.onload = function () {
    document.querySelector("#studentLoginBtn").addEventListener("click", function () {
        const username = document.querySelector("#username").value
        const password = document.querySelector("#password").value
        login(username, password, "student")
    });
    document.querySelector("#teacherLoginBtn").addEventListener("click", function () {
        const username = document.querySelector("#username").value
        const password = document.querySelector("#password").value
        login(username, password, "teacher")
    })
}

async function login(username, password, role) {
    const login_info = {
        username,
        password,
        role
    }
    const response = await fetch("http://localhost:3000/api/auth/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(login_info)
    })

    if (response.ok) {
        const tokenResponse = await response.json()
        token = tokenResponse.token
        const uname = tokenResponse.username
        const auth = tokenResponse.auth

        localStorage.setItem("token", token)
        localStorage.setItem("uname", uname)
        localStorage.setItem("auth", auth)

        if (role === "student" && tokenResponse.userId) {
            localStorage.setItem("studentId", tokenResponse.studentId)
        }

        if (role === "teacher") {
            window.location.replace("./index.html")
        }
        else if (role === "student") {
            window.location.replace("./student_courses.html");
        }
    }
    else {
        document.querySelector("#errorMsg").innerHTML = "Bad username and password"
    }
}