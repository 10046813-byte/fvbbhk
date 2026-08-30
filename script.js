const canvas = document.querySelector("[data-ripple]");

if (canvas) {
  const context = canvas.getContext("2d", { alpha: true });
  const ripples = [];
  const pointer = { x: 0, y: 0, active: false };
  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let lastRipple = 0;

  const resize = () => {
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * pixelRatio);
    canvas.height = Math.floor(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  };

  const addRipple = (x, y, strength = 1) => {
    ripples.push({
      x,
      y,
      age: 0,
      radius: 8,
      strength,
      drift: (Math.random() - 0.5) * 0.8,
    });

    if (ripples.length > 44) {
      ripples.shift();
    }
  };

  const draw = () => {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "rgba(255,255,255,0.018)";
    context.fillRect(0, 0, width, height);

    for (let i = ripples.length - 1; i >= 0; i -= 1) {
      const ripple = ripples[i];
      ripple.age += 1;
      ripple.radius += 4.2 + ripple.strength * 2.2;
      ripple.x += ripple.drift;

      const alpha = Math.max(0, 1 - ripple.age / 86) * 0.34 * ripple.strength;

      context.save();
      context.globalAlpha = alpha;
      context.strokeStyle = "#ffffff";
      context.lineWidth = 1.2;

      for (let ring = 0; ring < 4; ring += 1) {
        const ringRadius = ripple.radius + ring * 18;
        context.beginPath();
        for (let a = 0; a <= Math.PI * 2 + 0.12; a += 0.12) {
          const wobble =
            Math.sin(a * 5 + ripple.age * 0.09 + ring) * 4 +
            Math.cos(a * 3 - ripple.age * 0.06) * 3;
          const x = ripple.x + Math.cos(a) * (ringRadius + wobble);
          const y = ripple.y + Math.sin(a) * (ringRadius * 0.46 + wobble);
          if (a === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        }
        context.stroke();
      }
      context.restore();

      if (ripple.age > 86) {
        ripples.splice(i, 1);
      }
    }

    if (pointer.active) {
      context.save();
      context.globalAlpha = 0.18;
      context.strokeStyle = "#ffffff";
      context.lineWidth = 1;
      for (let i = 0; i < 7; i += 1) {
        context.beginPath();
        context.arc(pointer.x, pointer.y, 18 + i * 13, 0, Math.PI * 2);
        context.stroke();
      }
      context.restore();
    }

    requestAnimationFrame(draw);
  };

  window.addEventListener("resize", resize);
  window.addEventListener(
    "pointermove",
    (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;

      const now = performance.now();
      if (now - lastRipple > 46) {
        addRipple(pointer.x, pointer.y, 0.62);
        lastRipple = now;
      }
    },
    { passive: true },
  );

  window.addEventListener(
    "pointerdown",
    (event) => {
      addRipple(event.clientX, event.clientY, 1.4);
    },
    { passive: true },
  );

  window.addEventListener("pointerleave", () => {
    pointer.active = false;
  });

  resize();
  addRipple(window.innerWidth / 2, window.innerHeight / 2, 0.9);
  draw();
}
