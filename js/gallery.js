// 🎯 SELECT ELEMENTS
const images = document.querySelectorAll("#gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("close");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let currentIndex = 0;


// 🔍 OPEN LIGHTBOX
images.forEach((img, index) => {
    img.addEventListener("click", () => {
        currentIndex = index;
        updateImage();
        lightbox.classList.add("active");
    });
});


// 🖼️ UPDATE IMAGE FUNCTION
function updateImage() {
    lightboxImg.src = images[currentIndex].src;

    // ❗ Hide buttons at edges
    prevBtn.style.display = currentIndex === 0 ? "none" : "block";
    nextBtn.style.display = currentIndex === images.length - 1 ? "none" : "block";
}


// ➡️ NEXT IMAGE
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
});


// ⬅️ PREVIOUS IMAGE
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
});


// ❌ CLOSE BUTTON
closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
});


// 🖱️ CLICK OUTSIDE TO CLOSE
lightbox.addEventListener("click", (e) => {
    if (
        e.target === lightbox || 
        e.target === lightboxImg.parentElement
    ) {
        lightbox.classList.remove("active");
    }
});


// ⌨️ KEYBOARD SUPPORT (PRO 🔥)
document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    }

    if (e.key === "ArrowLeft") {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
    }

    if (e.key === "Escape") {
        lightbox.classList.remove("active");
    }
});