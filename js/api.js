// 🌐 BASE URL
const API_BASE = "http://localhost:3000/api";

// 🔐 GET TOKEN
function getToken() {
    return localStorage.getItem("token");
}

// 📡 GENERIC REQUEST FUNCTION
async function apiRequest(endpoint, method = "GET", body = null, isFormData = false) {
    try {
        const headers = {};

        const token = getToken();
        if (token) {
            headers["Authorization"] = "Bearer " + token; // ✅ FIXED
        }

        if (!isFormData) {
            headers["Content-Type"] = "application/json";
        }

        const res = await fetch(`${API_BASE}${endpoint}`, {
            method,
            headers,
            body: body ? (isFormData ? body : JSON.stringify(body)) : null
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "API Error");
        }

        return data;

    } catch (error) {
        console.error("API ERROR:", error.message);
        throw error;
    }
}


// 🔐 AUTH APIs
async function loginUser(data) {
    return apiRequest("/login", "POST", data);
}

async function registerUser(data) {
    return apiRequest("/register", "POST", data);
}


// 👤 USER APIs
async function getUserPhotos() {
    return apiRequest("/photos");
}

async function selectPhotos(data) {
    return apiRequest("/select-photos", "POST", data);
}


// 🧑‍💼 ADMIN APIs
async function getUserStats(userId) {
    return apiRequest(`/user/${userId}`);
}

async function getUsers() {
    return apiRequest("/users");
}



// 🚪 LOGOUT (optional helper)
function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}


// 🌍 MAKE FUNCTIONS GLOBAL
window.registerUser = registerUser;
window.loginUser = loginUser;
window.getUserPhotos = getUserPhotos;
window.selectPhotos = selectPhotos;
window.getUsers = getUsers;
window.getUserStats = getUserStats;
window.logout = logout;