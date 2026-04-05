// 🔐 LOGIN FORM
const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 📥 GET VALUES
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // ✅ VALIDATION
    if (!email || !password) {
        showToast("Please fill all fields", "error");
        return;
    }

    try {
        // 🚀 API CALL
        const res = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        // ❌ HANDLE ERROR
        if (!res.ok) {
            throw new Error(data.message || "Login failed");
        }

        // 💾 SAVE TOKEN
        localStorage.setItem("token", data.token);

        // 💾 (Optional) Save user info
        localStorage.setItem("user", JSON.stringify(data.user));

        // 🔔 SUCCESS
        showToast("Login successful!");

        // 🔁 REDIRECT BASED ON ROLE
        setTimeout(() => {
            if (data.user && data.user.isAdmin) {
                window.location.href = "admin.html";
            } else {
                window.location.href = "dashboard.html";
            }
        }, 1000);

    } catch (error) {
        console.error(error);
        showToast(error.message || "Login failed", "error");
    }
});