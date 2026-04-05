// 🎯 FILTER IMAGES
function filterImages(category) {
    const images = document.querySelectorAll("#gallery img");

    images.forEach(img => {
        const cat = img.getAttribute("data-category");

        if (category === "all" || cat === category) {
            img.style.display = "block";
        } else {
            img.style.display = "none";
        }
    });
}


// 🔍 LIGHTBOX
const images = document.querySelectorAll("#gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("close");

images.forEach(img => {
    img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
        lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
});
    });
});

closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});