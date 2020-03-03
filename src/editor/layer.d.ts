export interface Layer {
  name: string;
  shape: 'square' | 'circle' | 'other';
  fill: string;
  alpha: number;
  scale: number;
}

/**
 * Create a new image or color canvas.
 * @param {string} fill
 * @returns {import("./layer.js").Layer}
 */
export function createLayer(fill?: string): Layer;
