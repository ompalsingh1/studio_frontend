// 🔐 CHECK LOGIN
const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const user = JSON.parse(localStorage.getItem("user"));

function showToast(msg) {
    alert(msg);
}

// LIGHTBOX ELEMENTS
const lightbox =
    document.getElementById("lightbox");

const lightboxImg =
    document.getElementById("lightboxImg");

const closeBtn =
    document.getElementById("closeBtn");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const selectImageBtn =
    document.getElementById("selectImageBtn");

let currentIndex = 0;


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

    const data = await getUserPhotos();

    images = data.photos || [];

    grid.innerHTML = "";

    images.forEach((imgObj, index) => {

        // 📦 CREATE CARD
        const div =
            document.createElement("div");

        div.classList.add("photo");

        div.innerHTML = `

            <!-- ✅ SELECT BUTTON -->
            <div class="photo-select">
                ✓
            </div>

            <!-- 🖼️ IMAGE -->
            <img
                src="http://localhost:3000${imgObj.url}"
                alt="photo"
            />
        `;

        // ELEMENTS
        const img =
            div.querySelector("img");

        const selectBtn =
            div.querySelector(".photo-select");


        // =========================
        // OPEN LIGHTBOX
        // =========================

        img.addEventListener("click", () => {

            currentIndex = index;

            showLightbox();
        });


        // =========================
        // SELECT IMAGE
        // =========================

        selectBtn.addEventListener(
            "click",
            (e) => {

                // PREVENT LIGHTBOX
                e.stopPropagation();

                // REMOVE
                if (
                    selected.includes(index)
                ) {

                    selected =
                        selected.filter(
                            i => i !== index
                        );

                    selectBtn.classList.remove(
                        "active"
                    );

                }

                // ADD
                else {

                    selected.push(index);

                    selectBtn.classList.add(
                        "active"
                    );
                }

                // UPDATE COUNT
                selectedCount.innerText =
                    selected.length;
            }
        );


        // =========================
        // RESTORE SELECTED STATE
        // =========================

        if (
            selected.includes(index)
        ) {

            selectBtn.classList.add(
                "active"
            );
        }


        // APPEND CARD
        grid.appendChild(div);
    });

} catch (error) {

    console.error(error);

    showToast(
        "Failed to load photos"
    );
}


}


function showLightbox() {

    const photo = images[currentIndex];

    lightboxImg.src =
        "http://localhost:3000" + photo.url;

    lightbox.classList.add("show");

    updateSelectButton();
}

function updateSelectButton() {

    if (selected.includes(currentIndex)) {

        selectImageBtn.innerText =
            "Selected";

        selectImageBtn.classList.add("selected");

    } else {

        selectImageBtn.innerText =
            "Select Photo";

        selectImageBtn.classList.remove("selected");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    loadUserStats(user._id);
});

async function loadUserStats(userId) {
    try {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:3000/api/user/${userId}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        });

        const data = await res.json();

        const totalEl = document.getElementById("totalPhotos");
        const selectedEl = document.getElementById("selectedPhotos");

        if (totalEl) totalEl.innerText = data.totalPhotos || 0;
        if (selectedEl) selectedEl.innerText = data.selectedPhotos || 0;

    } catch (error) {
        console.error("Stats error:", error);
    }
}

async function loadSelectedPhotos(userId) {
    try {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:3000/api/selected-photos/${userId}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        });

        const data = await res.json();

        const grid = document.getElementById("selectedPhotoGrid");
        grid.innerHTML = "";

        if (!data.selectedPhotos.length) {
            grid.innerHTML = "<p>No photos selected</p>";
            return;
        }

        data.selectedPhotos.forEach(photo => {
            const img = document.createElement("img");
            img.src = "http://localhost:3000" + photo.url;
            img.style.width = "150px";
            grid.appendChild(img);
        });

    } catch (error) {
        console.error("Error loading selected photos:", error);
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
        location.reload(); // refresh to update stats and selected photos

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

document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    loadUserStats(user._id);
    loadPhotos();
    loadSelectedPhotos(user._id); // 🔥 THIS LINE
});

selectImageBtn.addEventListener("click", () => {

    if (selected.includes(currentIndex)) {

        selected = selected.filter(
            i => i !== currentIndex
        );

    } else {

        selected.push(currentIndex);
    }

    selectedCount.innerText = selected.length;

    updateSelectButton();
});

closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("show");
});

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    showLightbox();
});

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    showLightbox();
});


// 🚀 INIT
// loadPhotos();