const gallery = document.querySelector("[data-gallery]");

if (gallery) {
  const image = gallery.querySelector("[data-gallery-image]");
  const status = document.querySelector("[data-gallery-status]");
  const images = JSON.parse(gallery.dataset.galleryImages);
  let index = 0;

  // Warm the remaining photographs so clicks keep the image area steady.
  for (const source of images.slice(1)) {
    const preload = new Image();
    preload.src = source;
  }

  gallery.addEventListener("click", () => {
    index = (index + 1) % images.length;
    const position = `${index + 1} of ${images.length}`;
    image.src = images[index];
    image.alt = `Sensing the Unseen installation, photograph ${position}`;
    gallery.setAttribute("aria-label", `Sensing the Unseen, image ${position}. Next image`);
    status.textContent = `Image ${position}`;
  });
}
