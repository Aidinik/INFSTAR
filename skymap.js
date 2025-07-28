const map = document.getElementById("map");
const nightModeToggle = document.getElementById("nightModeToggle");

let isDragging = false;
let startX, startY;
let currentX = 0, currentY = 0;
let scale = 1;
let isNightMode = false;

// Animate the map appearing
window.addEventListener("load", () => {
    setTimeout(() => {
        map.style.transform = "scale(1)";
        map.style.opacity = "1";
    }, 100);
});

// Mouse dragging
map.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX - currentX;
    startY = e.clientY - currentY;
    map.style.cursor = "grabbing";
});

map.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    currentX = e.clientX - startX;
    currentY = e.clientY - startY;
    updateTransform();
});

map.addEventListener("mouseup", stopDrag);
map.addEventListener("mouseleave", stopDrag);

// Touch dragging
map.addEventListener("touchstart", (e) => {
    if (e.touches.length !== 1) return;
    isDragging = true;
    startX = e.touches[0].clientX - currentX;
    startY = e.touches[0].clientY - currentY;
}, { passive: false });

map.addEventListener("touchmove", (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    e.preventDefault();
    currentX = e.touches[0].clientX - startX;
    currentY = e.touches[0].clientY - startY;
    updateTransform();
}, { passive: false });

map.addEventListener("touchend", stopDrag);

function stopDrag() {
    isDragging = false;
    map.style.cursor = "grab";
}

// Zoom with mouse wheel
map.addEventListener("wheel", (e) => {
    e.preventDefault();
    let zoomAmount = e.deltaY > 0 ? -0.1 : 0.1;
    scale = Math.min(Math.max(1, scale + zoomAmount), 5);
    updateTransform();
}, { passive: false });

function updateTransform() {
    map.style.transform = `scale(${scale}) translate(${currentX}px, ${currentY}px)`;
}

// Toggle night mode image
nightModeToggle.addEventListener("click", () => {
    if (isNightMode) {
        map.src = "assets/images/1_17383561738.png";
        nightModeToggle.textContent = "Toggle Night Mode";
    } else {
        map.src = "assets/images/night.png";
        nightModeToggle.textContent = "Toggle Day Mode";
    }
    isNightMode = !isNightMode;
});
