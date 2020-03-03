// @ts-check

/** @type {HTMLFormElement} */
const options = document.querySelector('.options');

/**
 * Updates the preview span adjacent to an input with the current value.
 * @param {HTMLInputElement} input
 */
export function updatePreview(input) {
  if (input.className !== 'control__input') return;
  const preview = /** @type {HTMLSpanElement} */ (input.nextElementSibling);
  preview.textContent = input.value + (preview.dataset.suffix || '');
}

/**
 * Sets the selected layer based on a radio element.
 * @param {import("./layer").Layer} layer
 */
export function selectLayer(layer) {
  options.scale.value = layer.scale;
  options.scale.disabled = layer.locked;
  options.fill.value = layer.fill;
  options.alpha.value = layer.alpha;
  options.alpha.disabled = layer.locked;
  Array.from(options.elements).forEach(updatePreview);
}

Array.from(options.elements).forEach(updatePreview);
