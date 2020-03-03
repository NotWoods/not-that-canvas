export interface Layer {
  shape: 'square' | 'circle' | 'other';
  fill: string;
  alpha: number;
  scale: number;
}

export function randomId(): string;

/**
 * Create a new image or color canvas.
 * @param {string} fill
 * @returns {import("./layer.js").Layer}
 */
export function createLayer(fill?: string): Layer;
