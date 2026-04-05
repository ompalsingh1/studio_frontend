// 📡 REGISTER FORM
const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 📥 GET VALUES
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    // ✅ VALIDATION
    if (!name || !email || !password || !confirmPassword) {
        showToast("Please fill all fields", "error");
        return;
    }

    if (password !== confirmPassword) {
        showToast("Passwords do not match", "error");
        return;
    }

    if (password.length < 6) {
        showToast("Password must be at least 6 characters", "error");
        return;
    }

    try {
        // 🚀 API CALL
        const res = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();

        // ❌ HANDLE ERROR
        if (!res.ok) {
            throw new Error(data.message || "Registration failed");
        }

        // ✅ SUCCESS
        showToast("Registration successful!");

        // 🔁 REDIRECT
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1200);

    } catch (error) {
        console.error(error);
        showToast(error.message || "Registration failed", "error");
    }
});