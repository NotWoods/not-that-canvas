/**
 * List containing different layers to select.
 * @type {HTMLUListElement}
 */
const list = document.querySelector('.layers__list');
/**
 * Form containing controls for the selected layer.
 * @type {HTMLFormElement}
 */
const options = document.querySelector('.options');

/**
 * Updates the preview text span adjacent to an input with the current value.
 * @param {HTMLInputElement} input
 */
function updateInputText(input) {
  if (input.matches('.control__input')) {
    const preview = /** @type {HTMLSpanElement} */ (input.nextElementSibling);
    preview.textContent = input.value + (preview.dataset.suffix || '');
  }
}

export class LayerOptions {
  constructor() {
    /**
     * Map of radio buttons to their corresponding layers.
     * @type {Map<HTMLInputElement, Layer>}
     */
    this.radioToLayer = new Map();

    /**
     * Called when the user changes options for a layer.
     * @public
     * @type {(layer: Layer) => void}
     */
    this.onLayerChange = () => {};

    // Event listeners (user events)

    list.addEventListener('change', evt => {
      const input = evt.target;
      this.selectLayer(this.radioToLayer.get(input));
    });

    options.addEventListener('input', evt => {
      const input = evt.target;

      const layer = this.getSelectedLayer();
      // "range" inputs are numbers. Otherwise the data type is a string.
      layer[input.name] =
        input.type === 'range' ? Number.parseInt(input.value, 10) : input.value;

      updateInputText(input);
      this.onLayerChange(layer);
    });
  }

  /**
   * Store a relation between a radio button and layer.
   * @param {HTMLInputElement} radio Radio button
   * @param {Layer} layer
   */
  storeRadioAndLayer(radio, layer) {
    this.radioToLayer.set(radio, layer);
    if (radio.checked) {
      this.selectLayer(layer);
    }
  }

  /**
   * Returns the layer that corresponds to the checked radio button.
   * @private
   */
  getSelectedLayer() {
    // Query checked radio button
    const radio = list.querySelector('input[name="layer"]:checked');
    return this.radioToLayer.get(radio);
  }

  /**
   * Update the form to show selected layer data.
   * @private
   * @param {Layer} layer
   */
  selectLayer(layer) {
    options.shape.forEach(radio => {
      radio.checked = radio.value === layer.shape;
    });
    options.scale.value = layer.scale;
    options.fill.value = layer.fill;
    options.alpha.value = layer.alpha;
    Array.from(options.elements).forEach(updateInputText);
  }
}
