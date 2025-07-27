const nightFolder = 'NIGHT/';
const dayFolder = 'assets/images/';

// Toggle night mode function (assuming you have a button with id="toggleNightMode")
const toggleBtn = document.getElementById('toggleNightMode');
const body = document.body;
const images = document.querySelectorAll('.constellation-image');

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('night-mode');
  const isNight = body.classList.contains('night-mode');

  images.forEach(img => {
    const filename = img.src.split('/').pop(); // get filename only, e.g. andromeda.jpg
    if (isNight) {
      img.src = `${nightFolder}${filename}`;
    } else {
      img.src = `${dayFolder}${filename}`;
    }
  });
});
document.getElementById('toggleNightMode').addEventListener('click', () => {
  document.body.classList.toggle('night-mode');
});
