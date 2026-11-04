const videos = [...document.querySelectorAll("video[data-hls]")];
const initialized = new WeakSet();

function initializeVideo(video) {
  if (initialized.has(video)) return;
  initialized.add(video);
  const error = video.closest(".moving-image-item").querySelector("[data-video-error]");

  if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = video.dataset.hls;
    video.addEventListener("error", () => { error.hidden = false; });
  } else if (window.Hls && Hls.isSupported()) {
    const player = new Hls({ maxBufferLength: 20, maxMaxBufferLength: 40, backBufferLength: 30 });
    player.on(Hls.Events.ERROR, (_event, data) => {
      if (data.fatal) error.hidden = false;
    });
    player.loadSource(video.dataset.hls);
    player.attachMedia(video);
  } else {
    error.hidden = false;
  }
}

for (const video of videos) {
  video.addEventListener("play", () => {
    for (const other of videos) {
      if (other !== video) other.pause();
    }
  });
}

// Prepare only nearby players instead of buffering all four films at once.
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        initializeVideo(entry.target);
        observer.unobserve(entry.target);
      }
    }
  }, { rootMargin: "300px 0px" });
  videos.forEach((video) => observer.observe(video));
} else {
  videos.forEach(initializeVideo);
}
