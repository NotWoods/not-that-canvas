// @ts-check

import { createLayer } from './layer.js';
import { CanvasController, scaleCanvas } from './canvas.js';
import { LayerOptions } from './options.js';

const PREVIEW_SIZE = 64;

const controller = new CanvasController(document.querySelector('.icon'));
const options = new LayerOptions();
options.onLayerChange = layer => controller.draw(layer);

// Look at each layer in the HTML and inflate it.
/** @type {NodeListOf<HTMLCanvasElement>} */
const layerElements = document.querySelectorAll('.layer__preview-button');
Array.from(layerElements).map((button, index) => {
  const layer = createLayer();
  // Make the layers increasing in size by default.
  layer.scale = 100 - (layerElements.length - index - 1) * 30;

  options.storeRadioAndLayer(button.querySelector('input'), layer);

  const previewCanvas = scaleCanvas(
    button.querySelector('canvas'),
    PREVIEW_SIZE,
  );

  controller.add(layer, previewCanvas);
});

// When the export button is clicked, download the icon as an image.
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
