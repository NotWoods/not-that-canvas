// @ts-check

/**
 * @typedef {object} CanvasContainer
 * @prop {HTMLCanvasElement} canvas
 * @prop {CanvasRenderingContext2D} ctx
 * @prop {number} size
 */

/**
 * Render layer to given canvas.
 * @param {import('./layer.js').Layer} layer
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} size
 */
export function drawLayer(layer, ctx, size) {
  ctx.clearRect(0, 0, size, size);
  let width = (layer.scale / 100) * size;
  let height = width;

  const insetX = (size - width) / 2;
  const insetY = (size - height) / 2;

  ctx.fillStyle = layer.fill;
  ctx.globalAlpha = layer.alpha / 100;
  ctx.fillRect(insetX, insetY, width, height);
}

/**
 * Create a new canvas element.
 * @param {number} size
 * @param {number} scale
 */
export function createCanvas(size, scale = 1) {
  const canvas = document.createElement('canvas');
  return scaleCanvas(canvas, size, scale);
}

/**
 * Scale an existing canvas element.
 * @param {HTMLCanvasElement} canvas
 * @param {number} size
 * @param {number} scale
 */
export function scaleCanvas(canvas, size, scale = 1) {
  canvas.width = size * scale;
  canvas.height = size * scale;
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);
  return { canvas, ctx, size };
}

export class CanvasController {
  constructor() {
    /**
     * List of layers to render
     * @private
     * @type {import('./layer.js').Layer[]}
     */
    this.layers = [];
    /**
     * Canvases corresponding to each layer
     * @private
     * @type {Map<import('./layer.js').Layer, CanvasContainer[]>}
     */
    this.canvases = new Map();
  }

  /**
   * Add a layer and display its canvas
   * @param {import('./layer.js').Layer} layer
   * @param {ReadonlyArray<Pick<CanvasContainer, 'canvas' | 'size'>>} canvases
   */
  add(layer, canvases) {
    this.layers.unshift(layer);
    this.canvases.set(
      layer,
      canvases.map(({ canvas, size }) => {
        return { canvas, size, ctx: canvas.getContext('2d') };
      }),
    );
    this.draw(layer);
  }

  /**
   * Delete a layer and its corresponding canvas
   * @param {import('./layer.js').Layer} layer
   */
  delete(layer) {
    const index = this.layers.indexOf(layer);
    if (index > -1) {
      this.layers.splice(index, 1);
      this.canvases.get(layer).forEach(({ canvas }) => canvas.remove());
      this.canvases.delete(layer);
    }
  }

  /**
   * Export the layers onto a single canvas
   */
  export() {
    const sizes = [];
    const size =
      sizes.length === 0 ? 1024 : sizes.reduce((acc, n) => Math.max(acc, n), 0);

    const { canvas: mainCanvas, ctx } = createCanvas(size);
    const { canvas: layerCanvas, ctx: layerCtx } = createCanvas(size);

    this.layers
      .slice()
      .reverse()
      .forEach(layer => {
        drawLayer(layer, layerCtx, size);
        ctx.drawImage(layerCanvas, 0, 0);
      });

    return mainCanvas;
  }

  /**
   * Draw the layer on its corresponding canvases
   * @param {import('./layer.js').Layer} layer
   */
  draw(layer) {
    const canvases = this.canvases.get(layer);
    for (const { ctx, size } of canvases) {
      drawLayer(layer, ctx, size);
    }
  }
}
