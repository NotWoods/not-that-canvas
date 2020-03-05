// @ts-check
import { drawLayer } from './layer.js';

/**
 * @typedef {object} CanvasContainer Object that represents a canvas to draw on.
 * @prop {HTMLCanvasElement} canvas Canvas element.
 * @prop {CanvasRenderingContext2D} ctx Rendering context of the canvas.
 * @prop {number} size Size of the canvas.
 */

const VIEWER_SIZE = 192;

/**
 * Create a new canvas element.
 * @param {number} size
 */
export function createCanvas(size) {
  const canvas = document.createElement('canvas');
  return scaleCanvas(canvas, size);
}

/**
 * Scale an existing canvas element.
 * @param {HTMLCanvasElement} canvas
 * @param {number} size
 */
export function scaleCanvas(canvas, size) {
  const scale = window.devicePixelRatio || 1;

  canvas.width = size * scale;
  canvas.height = size * scale;
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);
  return { canvas, ctx, size };
}

export class CanvasController {
  /**
   * @param {HTMLCanvasElement} viewerCanvas
   */
  constructor(viewerCanvas) {
    /**
     * List of layers to render
     * @private
     * @type {import('./layer.js').Layer[]}
     */
    this.layers = [];
    /**
     * Preview canvases corresponding to each layer
     * @private
     * @type {Map<import('./layer.js').Layer, CanvasContainer>}
     */
    this.previews = new Map();
    /**
     * Viewer canvas corresponding to the entire icon
     */
    this.viewer = scaleCanvas(viewerCanvas, VIEWER_SIZE);
  }

  /**
   * Add a layer and display its canvas
   * @param {import('./layer.js').Layer} layer
   * @param {CanvasContainer} preview
   */
  add(layer, preview) {
    this.layers.unshift(layer);
    this.previews.set(layer, preview);
    this.draw(layer);
  }

  /**
   * Export the layers onto a single canvas
   */
  export(size = 1024) {
    const tmpCanvas = createCanvas(size);
    this.drawAllLayers(tmpCanvas);
    return tmpCanvas.canvas;
  }

  /**
   * Draw the layer on its corresponding canvases
   * @param {import('./layer.js').Layer} layer
   */
  draw(layer) {
    const { ctx, size } = this.previews.get(layer);

    // Redraw entire viewer canvas
    this.drawAllLayers(this.viewer);

    // Redraw this layer's preview canvas
    ctx.clearRect(0, 0, size, size);
    drawLayer(layer, ctx, size);
  }

  /**
   * Draw all known layers onto the given canvas.
   * @param {CanvasContainer} target Target canvas to draw on.
   */
  drawAllLayers(target) {
    const { ctx, size } = target;

    ctx.clearRect(0, 0, size, size);
    for (const layer of this.layers) {
      drawLayer(layer, ctx, size);
    }
  }
}
