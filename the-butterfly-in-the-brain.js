const gallery = document.querySelector("[data-gallery]");

if (gallery) {
  const image = gallery.querySelector("[data-gallery-image]");
  const status = document.querySelector("[data-gallery-status]");
  const images = JSON.parse(gallery.dataset.galleryImages);
  const videoSlide = document.querySelector("[data-gallery-video]");
  const video = videoSlide.querySelector("video");
  const next = videoSlide.querySelector("[data-gallery-next]");
  let index = 0;

  // Preload the remaining photographs for uninterrupted click-through.
  for (const source of images.slice(1)) {
    const preload = new Image();
    preload.src = source;
  }

  function nextItem() {
    const wasVideo = index === images.length;
    index = (index + 1) % (images.length + 1);

    if (index === images.length) {
      gallery.hidden = true;
      videoSlide.hidden = false;
      status.textContent = `Video ${index + 1} of ${images.length + 1}`;
      video.focus({ preventScroll: true });
      return;
    }

    video.pause();
    video.currentTime = 0;
    videoSlide.hidden = true;
    gallery.hidden = false;
    const position = `${index + 1} of ${images.length}`;
    const nextItemLabel = index === images.length - 1 ? "Next video" : "Next image";
    image.src = images[index];
    image.alt = `The Butterfly in the Brain installation, photograph ${position}`;
    gallery.setAttribute("aria-label", `The Butterfly in the Brain, image ${position}. ${nextItemLabel}`);
    status.textContent = `Image ${position}`;
    if (wasVideo) gallery.focus({ preventScroll: true });
  }

  gallery.addEventListener("click", nextItem);
  next.addEventListener("click", nextItem);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) video.pause();
  });
  window.addEventListener("pagehide", () => video.pause());
}
