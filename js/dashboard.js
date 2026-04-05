// 🔐 CHECK LOGIN
const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const user = JSON.parse(localStorage.getItem("user"));

function showToast(msg) {
    alert(msg);
}

// 👤 SHOW USER NAME
if (user && user.name) {
    document.getElementById("username").innerText = user.name;
}

// 📦 DOM ELEMENTS
const grid = document.getElementById("photoGrid");
const selectedCount = document.getElementById("selectedCount");

let selected = [];
let images = []; // will come from API

// 📸 LOAD USER PHOTOS FROM API
async function loadPhotos() {
    try {
        const data = await getUserPhotos(); // from api.js

        images = data.photos; // expected: [{url: "..."}]

        grid.innerHTML = "";

        images.forEach((imgObj, index) => {
            const div = document.createElement("div");
            div.classList.add("photo");

            div.innerHTML = `<img src="http://localhost:3000${imgObj.url}" />`;

            div.addEventListener("click", () => {
                div.classList.toggle("selected");

                if (selected.includes(index)) {
                    selected = selected.filter(i => i !== index);
                } else {
                    selected.push(index);
                }

                selectedCount.innerText = selected.length;
            });

            grid.appendChild(div);
        });

    } catch (error) {
        showToast("Failed to load photos", "error");
        console.error(error);
    }
}


// 🎯 SELECT FOR ALBUM
document.getElementById("selectBtn").addEventListener("click", async () => {
    if (selected.length === 0) {
        showToast("No photos selected", "error");
        return;
    }

    try {
        // send selected photo IDs or indexes
        await selectPhotos({
            selected: selected.map(i => images[i]._id) // assuming backend gives _id
        });

        showToast("Photos selected successfully!");

    } catch (error) {
        showToast("Error selecting photos", "error");
    }
});


// ⬇️ DOWNLOAD SELECTED PHOTOS
document.getElementById("downloadBtn").addEventListener("click", () => {
    if (selected.length === 0) {
        showToast("No photos selected", "error");
        return;
    }

    selected.forEach(i => {
        const link = document.createElement("a");
        link.href = "http://localhost:3000" + images[i].url;
        link.download = "photo.jpg";
        link.click();
    });
});


// 🚪 LOGOUT
document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
});


// 🚀 INIT
loadPhotos();