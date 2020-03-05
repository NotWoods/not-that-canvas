// @ts-check

function randomColor() {
  const randomHex = Math.random()
    .toString(16)
    .substr(-6);
  return `#${randomHex}`;
}

/**
 * Create a new layer.
 * @returns {import("./layer.js").Layer}
 */
export function createLayer() {
  return {
    // Either "square", "circle", or "other"
    shape: 'square',
    // Fill color (ie: #FF0000)
    fill: randomColor(),
    // Scale as percentage (100 = 100%, 50 = 50%, etc.)
    scale: 100,
    // Transparency (100 = opaque, 0 = transparent)
    alpha: 100,
  };
}

/**
 * Render layer to given canvas.
 * @param {import('./layer.js').Layer} layer
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} size
 */
export function drawLayer(layer, ctx, size) {
  const scaledSize = (layer.scale / 100) * size;
  ctx.fillStyle = layer.fill;
  ctx.globalAlpha = layer.alpha / 100;

  ctx.beginPath();
  switch (layer.shape) {
    case 'square': {
      // Square
      const insetX = (size - scaledSize) / 2;
      const insetY = (size - scaledSize) / 2;

      ctx.rect(insetX, insetY, scaledSize, scaledSize);
      break;
    }
    case 'circle': {
      // Circle
      const center = size / 2;
      const radius = scaledSize / 2;
      const start = 0;
      const end = Math.PI * 2;

      ctx.arc(center, center, radius, start, end);
      break;
    }
    case 'other': {
      // Triangle
      const center = size / 2;
      const offset = scaledSize / 2;

      ctx.moveTo(center, center - offset);
      ctx.lineTo(center - offset, center + offset);
      ctx.lineTo(center + offset, center + offset);
      break;
    }
  }
  ctx.closePath();
  ctx.fill();
}
