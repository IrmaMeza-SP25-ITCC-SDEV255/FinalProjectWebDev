document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#signupBtn").addEventListener("click", function (e) {
        e.preventDefault();
        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;
        const role = document.querySelector('input[name = "role"]:checked').value;

        if (!username || !password || !role) {
            alert("Fill in all fields")
            return;
        }
        signup(username, password, role);
    })

    async function signup(username, password, role) {
        const signup_info = { username, password, role }
        const response = await fetch("http://localhost:3000/api/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(signup_info)
        })

        if (response.ok) {
            alert("Sign up successful. You can now log in.")
            window.location.replace("./login.html");
        }
        else {
            const err = await response.json()
            alert("Sign up failed")
        }
    }
})