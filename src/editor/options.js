// @ts-check

/** @type {HTMLFormElement} */
const options = document.querySelector('.options');

/**
 * Updates the preview span adjacent to an input with the current value.
 * @param {HTMLInputElement} input
 */
export function updatePreview(input) {
  if (input.matches('.control__input')) {
    const preview = /** @type {HTMLSpanElement} */ (input.nextElementSibling);
    preview.textContent = input.value + (preview.dataset.suffix || '');
  }
}

/**
 * Sets the selected layer based on a radio element.
 * @param {import("./layer").Layer} layer
 */
export function selectLayer(layer) {
  options.shape.forEach(radio => {
    radio.checked = radio.value === layer.shape;
  });
  options.scale.value = layer.scale;
  options.fill.value = layer.fill;
  options.alpha.value = layer.alpha;
  Array.from(options.elements).forEach(updatePreview);
}

Array.from(options.elements).forEach(updatePreview);
