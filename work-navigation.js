const workRoot = document.documentElement;

// Apply the initial view before the page paints.
workRoot.classList.toggle("works-view", window.location.hash === "#works");

document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".work-hero video");
  const worksLink = document.querySelector('.work-header a[href="#works"]');

  const updateWorkView = () => {
    const showWorks = window.location.hash === "#works";
    workRoot.classList.toggle("works-view", showWorks);
    video.autoplay = !showWorks;

    if (showWorks) {
      video.pause();
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } else {
      video.play().catch(() => {});
    }
  };

  worksLink.addEventListener("click", () => {
    if (window.location.hash === "#works") {
      updateWorkView();
    }
  });

  window.addEventListener("hashchange", updateWorkView);
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      updateWorkView();
    }
  });

  updateWorkView();
});
