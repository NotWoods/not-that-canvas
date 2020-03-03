// @ts-check

function randomColor() {
  const randomHex = Math.random()
    .toString(16)
    .substr(-6);
  return `#${randomHex}`;
}

export function randomId() {
  return Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, '')
  .substr(2, 10);
}

/**
 * Create a new image or color canvas.
 * @param {string} fill
 * @returns {import("./layer.js").Layer}
 */
export function createLayer(fill = randomColor()) {
  return {
    shape: 'square',
    fill,
    scale: 100,
    alpha: 100,
  };
}
