export class PersonFilter {
  init(params) {
    this.valueGetter = params.valueGetter;
    this.filterText = null;
    this.setupGui(params);
  }

  // Not called by AG Grid — helper to set up the filter UI
  setupGui(params) {
    this.gui = document.createElement("div");
    this.gui.innerHTML = `<div style="padding: 4px; width: 200px;">
      <div style="font-weight: bold;">Custom filter: whole words</div>
      <div>
        <input style="margin: 4px 0 4px 0;" type="text" id="filterText" placeholder="Full name search..."/>
      </div>
    </div>`;

    const listener = (event) => {
      this.filterText = event.target.value;
      params.filterChangedCallback();
    };

    this.eFilterText = this.gui.querySelector("#filterText");
    this.eFilterText.addEventListener("input", listener);
    this.eFilterText.addEventListener("keydown", listener);
  }

  getGui() {
    return this.gui;
  }

  doesFilterPass(params) {
    const value = this.valueGetter(params);
    if (!this.filterText) return true;
    return Boolean(
      value && value.match(new RegExp(`\\b${this.filterText}\\b`, "i"))
    );
  }

  isFilterActive() {
    return this.filterText != null && this.filterText !== "";
  }

  getModel() {
    return { value: this.filterText };
  }

  setModel(model) {
    this.filterText = model ? model.value : null;
    if (this.eFilterText) {
      this.eFilterText.value = this.filterText || "";
    }
  }
}
