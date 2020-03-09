/**
 * @typedef {object} Layer Object that represents an image layer.
 * @prop {'square' | 'circle' | 'other'} shape
 * @prop {string} fill
 * @prop {number} scale
 * @prop {number} alpha
 */

function randomColor() {
  const randomHex = Math.random()
    .toString(16)
    .substr(-6);
  return `#${randomHex}`;
}

/**
 * Create a new layer.
 * @returns {Layer}
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
 * @param {Layer} layer Layer object, includes shape and size info.
 * @param {CanvasRenderingContext2D} ctx Canvas drawing context.
 * @param {number} size Size of the canvas (independent of high-density displays).
 */
export function drawLayer(layer, ctx, size) {
  const scaledSize = (layer.scale / 100) * size;
  ctx.fillStyle = layer.fill;
  ctx.globalAlpha = layer.alpha / 100;

  // TODO: draw layer using ctx methods
}
