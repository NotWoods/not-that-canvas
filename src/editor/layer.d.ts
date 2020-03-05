export interface Layer {
  shape: 'square' | 'circle' | 'other';
  fill: string;
  alpha: number;
  scale: number;
}

/**
 * Create a new image or color canvas.
 */
export function createLayer(): Layer;

/**
 * Render layer to given canvas.
 */
export function drawLayer(
  layer: Layer,
  ctx: CanvasRenderingContext2D,
  size: number,
): void;
