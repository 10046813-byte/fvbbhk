const map = document.querySelector("[data-sound-map]");

if (map) {
  const buttons = [...map.querySelectorAll("[data-location]")];
  let active = null;
  let playRequest = 0;

  function setSound(button, audible) {
    const video = button.querySelector("video");
    const location = button.dataset.location;
    video.muted = !audible;
    button.classList.toggle("is-audible", audible);
    button.setAttribute("aria-pressed", String(audible));
    button.setAttribute("aria-label", audible
      ? `Mute sound map location ${location}`
      : `Play sound map location ${location} with sound`);
    button.title = audible ? `Mute location ${location}` : `Play location ${location} with sound`;
  }

  function stopActive() {
    if (!active) return;
    const button = active;
    active = null;
    playRequest++;
    const video = button.querySelector("video");
    video.pause();
    video.currentTime = 0;
    button.classList.remove("is-active", "is-playing");
    setSound(button, false);
  }

  function play(button) {
    const video = button.querySelector("video");
    const request = ++playRequest;
    const pending = video.play();
    if (pending) pending.catch(() => {
      if (active === button && request === playRequest) stopActive();
    });
  }

  function activate(button) {
    if (active === button) return;
    stopActive();
    active = button;
    const video = button.querySelector("video");
    if (!video.getAttribute("src")) video.src = video.dataset.previewSrc;
    video.currentTime = 0;
    setSound(button, false);
    button.classList.add("is-active");
    play(button);
  }

  for (const button of buttons) {
    const video = button.querySelector("video");
    button.addEventListener("pointerenter", (event) => {
      if (event.pointerType !== "touch") activate(button);
    });
    button.addEventListener("pointerleave", (event) => {
      if (event.pointerType !== "touch" && active === button) stopActive();
    });
    button.addEventListener("focus", () => activate(button));
    button.addEventListener("blur", () => {
      if (active === button) stopActive();
    });
    button.addEventListener("click", () => {
      const wasActive = active === button;
      activate(button);
      setSound(button, wasActive ? video.muted : true);
      play(button);
    });
    button.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        stopActive();
      }
    });
    video.addEventListener("playing", () => {
      if (active === button) button.classList.add("is-playing");
    });
    video.addEventListener("error", () => {
      if (active === button) stopActive();
    });
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopActive();
  });
  document.addEventListener("pointerdown", (event) => {
    if (!map.contains(event.target)) stopActive();
  });
  window.addEventListener("pagehide", stopActive);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) stopActive();
    });
    observer.observe(map);
  }
}
