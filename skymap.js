const map = document.getElementById("map");
const nightModeToggle = document.getElementById("nightModeToggle");

let isDragging = false;
let startX, startY;
let currentX = 0, currentY = 0;
let scale = 1;
let isNightMode = false;

let lastTouchDistance = null; // برای تشخیص زوم لمسی (pinch zoom)

// Animate the map appearing
window.addEventListener("load", () => {
    setTimeout(() => {
        map.style.transform = "scale(1) translate(0, 0)";
        map.style.opacity = "1";
    }, 100);
});

// Mouse events
map.addEventListener("mousedown", startDrag);
map.addEventListener("mousemove", drag);
map.addEventListener("mouseup", stopDrag);
map.addEventListener("mouseleave", stopDrag);
map.addEventListener("wheel", zoomMap);

// Touch events
map.addEventListener("touchstart", touchStart, {passive:false});
map.addEventListener("touchmove", touchMove, {passive:false});
map.addEventListener("touchend", touchEnd);

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
        updateTransform();
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
    updateTransform();
}

function updateTransform() {
    map.style.transform = `scale(${scale}) translate(${currentX}px, ${currentY}px)`;
}

// Touch Handlers

function getTouchDistance(touches) {
    if(touches.length < 2) return null;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx*dx + dy*dy);
}

function touchStart(e) {
    if (e.touches.length === 1) {
        // درگ تک لمسی
        isDragging = true;
        startX = e.touches[0].clientX - currentX;
        startY = e.touches[0].clientY - currentY;
    } else if (e.touches.length === 2) {
        // شروع زوم دو لمسی
        isDragging = false;
        lastTouchDistance = getTouchDistance(e.touches);
    }
}

function touchMove(e) {
    e.preventDefault(); // جلوگیری از اسکرول صفحه هنگام زوم یا درگ روی تصویر
    if (e.touches.length === 1 && isDragging) {
        currentX = e.touches[0].clientX - startX;
        currentY = e.touches[0].clientY - startY;
        updateTransform();
    } else if (e.touches.length === 2) {
        const currentDistance = getTouchDistance(e.touches);
        if (lastTouchDistance) {
            let zoomChange = (currentDistance - lastTouchDistance) / 200; // ضریب تنظیم زوم لمسی
            scale = Math.min(Math.max(1, scale + zoomChange), 5);
            updateTransform();
        }
        lastTouchDistance = currentDistance;
    }
}

function touchEnd(e) {
    if (e.touches.length < 2) {
        lastTouchDistance = null;
    }
    if (e.touches.length === 0) {
        isDragging = false;
    }
}

// Night mode toggle (همون کد خودت)
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
