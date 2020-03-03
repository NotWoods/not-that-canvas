// @ts-check

import { createLayer } from './layer.js';
import { CanvasController, createCanvas, scaleCanvas } from './canvas.js';
import { selectLayer, updatePreview } from './options.js';

const VIEWER_SIZE = 192;
const PREVIEW_SIZE = 64;
const DPR = devicePixelRatio || 1;

/** @type {HTMLUListElement} */
const list = document.querySelector('.layers__list');
/** @type {HTMLFormElement} */
const options = document.querySelector('.options');
/** @type {NodeListOf<HTMLDivElement>} */
const canvasContainers = document.querySelectorAll('.icon__mask');

/** @type {WeakMap<Element, import("./layer.js").Layer>} */
const layers = new WeakMap();
const controller = new CanvasController();

// Look at each layer in the HTML and inflate it
/** @type {NodeListOf<HTMLCanvasElement>} */
const layerElements = document.querySelectorAll('.layer__preview-button');
Array.from(layerElements).map(button => {
  const layer = createLayer();
  layers.set(button.querySelector('input'), layer);

  const previewCanvas = scaleCanvas(
    button.querySelector('canvas'),
    PREVIEW_SIZE,
    DPR,
  );
  const viewerCanvases = Array.from(canvasContainers).map(container => {
    const c = createCanvas(VIEWER_SIZE, DPR);
    c.canvas.className = 'icon';
    container.append(c.canvas);
    return c;
  });

  controller.add(layer, viewerCanvases.concat(previewCanvas));
});

function getCheckedLayer() {
  /** @type {HTMLInputElement} */
  const radio = list.querySelector('input[name="layer"]:checked');
  return layers.get(radio);
}

selectLayer(getCheckedLayer());

list.addEventListener('change', evt => {
  const input = /** @type {HTMLInputElement} */ (evt.target);
  selectLayer(layers.get(input));
});

options.addEventListener('input', evt => {
  const input = /** @type {HTMLInputElement} */ (evt.target);

  const layer = getCheckedLayer();
  layer[input.name] =
    input.type === 'range' ? Number.parseInt(input.value, 10) : input.value;

  updatePreview(input);
  controller.draw(layer);
});

document
  .querySelector(`button[name="export"]`)
  .addEventListener('click', function onExport() {
    // Turn the canvas into an image
    const imageUrl = controller.export().toDataURL('image/png');

    // Create a fake link element for downloading the image
    let a = document.createElement('a');
    a.href = imageUrl;
    a.download = 'icon.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
