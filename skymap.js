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

// Dragging functionality
map.addEventListener("mousedown", startDrag);
map.addEventListener("mousemove", drag);
map.addEventListener("mouseup", stopDrag);
map.addEventListener("mouseleave", stopDrag);
map.addEventListener("wheel", zoomMap);

function startDrag(e) {
    isDragging = true;
    startX = e.clientX - currentX;
    startY = e.clientY - currentY;
    map.style.cursor = "grabbing";
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - startX;
        currentY = e.clientY - startY;
        map.style.transform = `scale(${scale}) translate(${currentX}px, ${currentY}px)`;
    }
}

function stopDrag() {
    isDragging = false;
    map.style.cursor = "grab";
}

function zoomMap(e) {
    e.preventDefault();
    let zoomAmount = e.deltaY > 0 ? -0.1 : 0.1;
    scale = Math.min(Math.max(1, scale + zoomAmount), 5);
    map.style.transform = `scale(${scale}) translate(${currentX}px, ${currentY}px)`;
}

// Toggle night mode
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
