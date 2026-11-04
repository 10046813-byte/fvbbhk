const gallery = document.querySelector("[data-gallery]");

if (gallery) {
  const image = gallery.querySelector("[data-gallery-image]");
  const status = document.querySelector("[data-gallery-status]");
  const images = JSON.parse(gallery.dataset.galleryImages);
  let index = 0;

  gallery.addEventListener("click", () => {
    index = (index + 1) % images.length;
    const position = `${index + 1} of ${images.length}`;
    image.src = images[index];
    gallery.setAttribute("aria-label", `Caring Knot, image ${position}`);
    status.textContent = `Image ${position}`;
  });
}
