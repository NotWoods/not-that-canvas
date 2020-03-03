// @ts-check

/**
 * Create a new image or color canvas.
 * @param {string} fill
 * @returns {import("./layer.js").Layer}
 */
export function createLayer(fill) {
  return {
    name: 'Layer',
    fill,
    scale: 100,
    alpha: 100,
    locked: false,
  };
}

export function backgroundLayer() {
  const layer = createLayer('#448AFF');
  layer.locked = true;
  return layer;
}
