document.addEventListener("DOMContentLoaded", () => {
  const map = document.getElementById("map");
  const mapLayer = document.querySelector(".mapLayer");
  const tip = document.getElementById("tip");

  if (!map || !mapLayer || !tip) return;

  const regions = map.querySelectorAll(".region");

  regions.forEach(region => {
    const name = region.dataset.name || "";

    region.addEventListener("mouseenter", () => {
      if (name) {
        tip.textContent = name;
        tip.classList.add("on");
      }
    });

    region.addEventListener("mousemove", (e) => {
      const rect = mapLayer.getBoundingClientRect();

      // position tooltip RELATIVE to the map container
      tip.style.left = (e.clientX - rect.left) + "px";
      tip.style.top  = (e.clientY - rect.top) + "px";
    });

    region.addEventListener("mouseleave", () => {
      tip.classList.remove("on");
    });
  });
});

