export interface Layer {
  name: string;
  fill: string;
  alpha: number;
  scale: number;
  locked: boolean;
}

/**
 * Create a new image or color canvas.
 * @param {string} fill
 * @returns {import("./layer.js").Layer}
 */
export function createLayer(fill: string): Layer;

export function backgroundLayer(): Layer;
