// 🔐 AUTH CHECK
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!token || !user || !user.isAdmin) {
    window.location.href = "login.html";
}

// 📦 ELEMENTS
const userList = document.getElementById("userList");

let selectedUserId = null;


// 👥 LOAD USERS
async function loadUsers() {
    try {
        const res = await fetch("http://localhost:3000/api/users", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const users = await res.json();

        // ❌ ERROR HANDLING
        if (!res.ok || !Array.isArray(users)) {
            console.error("Users error:", users);
            alert(users.message || "Failed to load users");
            return;
        }

        userList.innerHTML = "";

        users.forEach(user => {
            const li = document.createElement("li");
            li.innerText = `${user.name} (${user.email})`;

            li.addEventListener("click", () => selectUser(user));

            userList.appendChild(li);
        });

    } catch (error) {
        console.error("Load users error:", error);
        alert("Server error while loading users");
    }
}


// 🎯 SELECT USER
function selectUser(user) {
    selectedUserId = user._id;

    document.getElementById("userName").innerText = user.name;
    document.getElementById("userEmail").innerText = user.email;

    loadUserStats(user._id);
}


// 📊 LOAD USER STATS
async function loadUserStats(userId) {
    try {
        const res = await fetch(`http://localhost:3000/api/user/${userId}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "Failed to load stats");
            return;
        }

        document.getElementById("totalPhotos").innerText = data.totalPhotos || 0;
        document.getElementById("selectedPhotos").innerText = data.selectedPhotos || 0;

    } catch (error) {
        console.error("Stats error:", error);
        alert("Error loading user stats");
    }
}


// 📤 UPLOAD PHOTOS
document.getElementById("uploadBtn").addEventListener("click", async () => {
    try {
        if (!selectedUserId) {
            alert("Select a user first");
            return;
        }

        const files = document.getElementById("photos").files;

        if (files.length === 0) {
            alert("Select at least one file");
            return;
        }

        const formData = new FormData();
        formData.append("userId", selectedUserId);

        for (let file of files) {
            formData.append("photos", file);
        }

        const res = await fetch("http://localhost:3000/api/upload", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token
            },
            body: formData
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "Upload failed");
            return;
        }

        alert("Photos uploaded successfully ✅");

        // 🔄 REFRESH STATS
        loadUserStats(selectedUserId);

    } catch (error) {
        console.error("Upload error:", error);
        alert("Server error during upload");
    }
});


// 🚪 LOGOUT
document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "login.html";
});


// 🚀 INIT
loadUsers();