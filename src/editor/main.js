// @ts-check

import { createLayer, randomId } from './layer.js';
import { CanvasController, createCanvas, scaleCanvas } from './canvas.js';
import { selectLayer, updatePreview } from './options.js';

const VIEWER_SIZE = 192;
const PREVIEW_SIZE = 64;
const DPR = devicePixelRatio || 1;

/** @type {HTMLUListElement} */
const list = document.querySelector('.layers__list');
/** @type {HTMLTemplateElement} */
const template = document.querySelector('.layer__template');
/** @type {HTMLFormElement} */
const options = document.querySelector('.options');
/** @type {NodeListOf<HTMLDivElement>} */
const canvasContainers = document.querySelectorAll(
  '.icon__mask',
);

/** @type {WeakMap<Element, import("./layer.js").Layer>} */
const layers = new WeakMap();
const controller = new CanvasController();

/** @param {HTMLCanvasElement} preview */
function createCanvases(preview) {
  const viewerCanvases = Array.from(canvasContainers).map(container => {
    const c = createCanvas(VIEWER_SIZE, DPR);
    c.canvas.className = 'icon';
    container.append(c.canvas);
    return c;
  });

  return viewerCanvases.concat(scaleCanvas(preview, PREVIEW_SIZE, DPR));
}

{
  const background = createLayer();
  /** @type {HTMLCanvasElement} */
  const backgroundPreview = document.querySelector(
    '.layer__preview--background',
  );
  const canvases = createCanvases(backgroundPreview);

  layers.set(
    document.querySelector('input[name="layer"][value="background"'),
    background,
  );
  controller.add(background, canvases);
}

function checked() {
  /** @type {HTMLInputElement} */
  const radio = list.querySelector('input[name="layer"]:checked');
  return radio;
}

/**
 * Creates a new element representing a layer.
 * @param {import("./layer.js").Layer} layer
 */
function newLayerElement(layer) {
  const id = randomId();
  const clone = document.importNode(template.content, true);

  /** @type {HTMLInputElement} */
  const radio = clone.querySelector('input[name="layer"]');
  radio.value = id;
  radio.id = id;
  radio.checked = true;

  clone.querySelector('label').htmlFor = id;

  selectLayer(layer);

  /** @type {HTMLCanvasElement} */
  const preview = clone.querySelector('.layer__preview');
  const canvases = createCanvases(preview);

  layers.set(radio, layer);
  controller.add(layer, canvases);
  list.prepend(clone);
}

selectLayer(layers.get(checked()));

list.addEventListener('change', evt => {
  const input = /** @type {HTMLInputElement} */ (evt.target);
  selectLayer(layers.get(input));
});

options.addEventListener('input', evt => {
  const input = /** @type {HTMLInputElement} */ (evt.target);

  const layer = layers.get(checked());
  layer[input.name] =
    input.type === 'range' ? Number.parseInt(input.value, 10) : input.value;

  updatePreview(input);
  controller.draw(layer);
});

/**
 * Attach click listener to button
 * @param {string} name
 * @param {() => void} listener
 */
function button(name, listener) {
  document
    .querySelector(`button[name="${name}"]`)
    .addEventListener('click', listener);
}

button('add', () => {
  newLayerElement(createLayer());
});
button('export', () => {
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
