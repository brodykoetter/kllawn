import React, { useEffect, useRef } from "react";

// Seeded RNG so the lawn looks identical on every draw / resize.
const makeRng = (seed) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const drawSky = (ctx, W, horizon) => {
  const sky = ctx.createLinearGradient(0, 0, 0, horizon);
  sky.addColorStop(0, "#5a9bd8");
  sky.addColorStop(0.65, "#9cc9ee");
  sky.addColorStop(1, "#d6ebf5");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, horizon + 2);
};

const drawClouds = (ctx, W, horizon, rand) => {
  for (let i = 0; i < 9; i++) {
    const cx = rand() * W;
    const cy = horizon * (0.12 + rand() * 0.6);
    const size = W * (0.06 + rand() * 0.1);
    for (let j = 0; j < 9; j++) {
      const x = cx + (rand() - 0.5) * size * 2.2;
      const y = cy + (rand() - 0.5) * size * 0.35;
      const r = size * (0.35 + rand() * 0.45);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, "rgba(255,255,255,0.55)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
  }
};

const drawTreeline = (ctx, W, horizon, rand) => {
  const layers = [
    { color: "#5c8a67", height: 0.1, size: 0.022 },
    { color: "#35603f", height: 0.075, size: 0.03 },
    { color: "#214a2c", height: 0.05, size: 0.034 },
  ];
  layers.forEach((layer, li) => {
    ctx.fillStyle = layer.color;
    for (let x = -40; x < W + 40; x += W * layer.size * 0.45) {
      const hump = Math.sin(x * 0.004 + li * 2) * 0.5 + 0.5;
      const r = W * layer.size * (0.6 + rand() * 0.7);
      const y = horizon - horizon * layer.height * (0.45 + hump * 0.7) + r * 0.4;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillRect(0, horizon - 2, W, 6);
  });
};

const drawLawn = (ctx, W, H, horizon, rand) => {
  const vx = W * 0.5;
  const span = H - horizon;

  // base grass colour, hazier in the distance
  const base = ctx.createLinearGradient(0, horizon, 0, H);
  base.addColorStop(0, "#6f9a62");
  base.addColorStop(0.25, "#4a8441");
  base.addColorStop(1, "#2a5e2d");
  ctx.fillStyle = base;
  ctx.fillRect(0, horizon, W, span);

  // mowing stripes radiating from the vanishing point
  const stripes = 22;
  const left = -W * 1.6;
  const right = W * 2.6;
  const step = (right - left) / stripes;
  for (let i = 0; i < stripes; i++) {
    const xa = left + i * step;
    const xb = xa + step;
    ctx.beginPath();
    ctx.moveTo(vx, horizon);
    ctx.lineTo(xa, H);
    ctx.lineTo(xb, H);
    ctx.closePath();
    ctx.fillStyle = i % 2 === 0 ? "rgba(190,255,150,0.16)" : "rgba(0,35,0,0.17)";
    ctx.fill();
  }

  // individual grass blades, bigger and denser toward the viewer
  const count = Math.round((W * span) / 90);
  for (let n = 0; n < count; n++) {
    const t = Math.pow(rand(), 0.85);
    const y = horizon + span * t;
    const x = rand() * W;
    const s = 0.12 + t * 1.9;
    const bottomX = vx + (x - vx) * (span / Math.max(1, y - horizon));
    const idx = Math.floor((bottomX - left) / step);
    const light = ((idx % 2) + 2) % 2 === 0;
    const len = (3 + rand() * 6) * s;
    const lean = (rand() - 0.5) * 0.9;
    const hue = 100 + rand() * 26;
    const lum = (light ? 40 : 28) + rand() * 14 - (1 - t) * -6;
    ctx.strokeStyle = `hsla(${hue}, 42%, ${lum}%, ${0.35 + rand() * 0.35})`;
    ctx.lineWidth = Math.max(0.5, s * 0.75);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + lean * len, y - len);
    ctx.stroke();
  }

  // atmospheric haze near the horizon
  const haze = ctx.createLinearGradient(0, horizon, 0, horizon + span * 0.4);
  haze.addColorStop(0, "rgba(214,235,220,0.7)");
  haze.addColorStop(1, "rgba(214,235,220,0)");
  ctx.fillStyle = haze;
  ctx.fillRect(0, horizon, W, span * 0.4);

  // soft tree shadows falling across the lawn
  [
    [0.18, 0.2, 0.34, 0.07],
    [0.82, 0.38, 0.4, 0.09],
    [0.6, 0.1, 0.22, 0.045],
  ].forEach(([px, py, rw, rh]) => {
    const cx = W * px;
    const cy = horizon + span * (0.15 + py * 1.5);
    const rx = W * rw;
    const ry = H * rh;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(1, ry / rx);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
    g.addColorStop(0, "rgba(5,30,10,0.34)");
    g.addColorStop(0.7, "rgba(5,30,10,0.16)");
    g.addColorStop(1, "rgba(5,30,10,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, rx, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
};

const drawFinish = (ctx, W, H) => {
  // sun glow
  const sun = ctx.createRadialGradient(W * 0.8, 0, 0, W * 0.8, 0, W * 0.7);
  sun.addColorStop(0, "rgba(255,244,205,0.38)");
  sun.addColorStop(1, "rgba(255,244,205,0)");
  ctx.fillStyle = sun;
  ctx.fillRect(0, 0, W, H);

  // vignette
  const v = ctx.createRadialGradient(W / 2, H * 0.55, H * 0.35, W / 2, H * 0.55, Math.max(W, H) * 0.8);
  v.addColorStop(0, "rgba(0,0,0,0)");
  v.addColorStop(1, "rgba(0,20,5,0.4)");
  ctx.fillStyle = v;
  ctx.fillRect(0, 0, W, H);
};

const HeroLawn = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const render = () => {
      const parent = canvas.parentElement;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const W = Math.round(parent.clientWidth * dpr);
      const H = Math.round(parent.clientHeight * dpr);
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d");
      const rand = makeRng(20240601);
      const horizon = H * 0.36;

      drawSky(ctx, W, horizon);
      drawClouds(ctx, W, horizon, rand);
      drawTreeline(ctx, W, horizon, rand);
      drawLawn(ctx, W, H, horizon, rand);
      drawFinish(ctx, W, H);
    };

    render();
    let timer;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(render, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-lawn" aria-hidden="true" />;
};

export default HeroLawn;
