// 🔥 LOADER
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    if (loader) {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
    }
});


// 🌊 SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});


// 🔝 NAVBAR SCROLL EFFECT
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");

    if (navbar) {   // ✅ FIX
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(0,0,0,0.95)";
            navbar.style.boxShadow = "0 5px 10px rgba(0,0,0,0.5)";
        } else {
            navbar.style.background = "rgba(0,0,0,0.8)";
            navbar.style.boxShadow = "none";
        }
    }
});


// 🔔 TOAST SYSTEM
function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.classList.add("toast");

    toast.innerText = message;

    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "5px";
    toast.style.color = "#fff";
    toast.style.zIndex = "9999";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    toast.style.transition = "all 0.3s ease";

    if (type === "error") {
        toast.style.background = "#ff4d4d";
    } else {
        toast.style.background = "gold";
        toast.style.color = "#000";
    }

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
    }, 100);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(20px)";
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}


// ✨ IMAGE HOVER EFFECT
const images = document.querySelectorAll(".gallery-grid img");

if (images.length > 0) {   // ✅ FIX
    images.forEach(img => {
        img.addEventListener("mouseover", () => {
            img.style.filter = "brightness(70%)";
        });

        img.addEventListener("mouseout", () => {
            img.style.filter = "brightness(100%)";
        });
    });
}


// 🧠 API BASE
const API_BASE = "http://localhost:3000/api";