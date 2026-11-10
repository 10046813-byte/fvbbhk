for (const image of document.querySelectorAll("img")) {
  image.draggable = false;
  const control = image.closest("a, button");
  if (control) {
    control.draggable = false;
    control.classList.add("image-protected");
  }
}

const preventImageInteraction = (event) => {
  if (event.target instanceof Element && event.target.closest("img, .image-protected")) {
    event.preventDefault();
  }
};

document.addEventListener("contextmenu", (event) => event.preventDefault(), true);
document.addEventListener("dragstart", preventImageInteraction, true);
document.addEventListener("selectstart", preventImageInteraction, true);
