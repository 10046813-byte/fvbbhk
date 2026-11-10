const mapZoomButton = document.querySelector("[data-map-zoom]");

if (mapZoomButton) {
  const image = mapZoomButton.querySelector("img");

  mapZoomButton.addEventListener("click", (event) => {
    const zoomIn = mapZoomButton.getAttribute("aria-pressed") !== "true";
    const bounds = image.getBoundingClientRect();
    const x = event.detail === 0 ? 0.5 : Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    const y = event.detail === 0 ? 0.5 : Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));

    mapZoomButton.setAttribute("aria-pressed", String(zoomIn));
    mapZoomButton.setAttribute("aria-label", zoomIn ? "Zoom out of sound map" : "Zoom in on sound map");
    mapZoomButton.title = zoomIn ? "Zoom out" : "Zoom in";

    const zoomedBounds = image.getBoundingClientRect();
    window.scrollTo({
      left: zoomIn ? image.offsetLeft + x * zoomedBounds.width - window.innerWidth / 2 : 0,
      top: zoomIn ? image.offsetTop + y * zoomedBounds.height - window.innerHeight / 2 : 0,
      behavior: "instant",
    });
  });
}
