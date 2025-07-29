<script>
  document.addEventListener("DOMContentLoaded", () => {
    const modeToggle = document.getElementById("modeToggle");
    const images = document.querySelectorAll(".image-button img");

    let isNight = false;

    modeToggle.addEventListener("click", () => {
      isNight = !isNight;
      modeToggle.textContent = isNight ? "روز" : "شب";

      images.forEach(img => {
        const alt = img.alt.trim(); // Constellation name from alt

        // Convert name to filename format
        const fileBase = alt.replace(/\s+/g, "_");
        const fileMatch = img.src.match(/(_map.*?\.png)/);
        const fileSuffix = fileMatch ? fileMatch[1] : "_constellation_map.png";

        const basePath = isNight 
          ? "assets/NIGHT/other const;ations/" 
          : "assets/DAY/";

        img.src = basePath + fileBase + fileSuffix;
      });
    });
  });
</script>
