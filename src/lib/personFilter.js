export class PersonFilter {
    init(params) {
        this.valueGetter = params.valueGetter;
        this.filterText = null;
        this.setupGui(params);
    }

    // Not called by AG Grid — helper to set up the filter UI
    setupGui(params) {
        this.gui = document.createElement('div');
        this.gui.innerHTML = `<div style="padding: 12px; width: 220px; display: flex; flex-direction: column; gap: 8px;">
      <div style="font-size: 12px; font-weight: 600; color: #374151;">Whole-word filter</div>
      <input style="width: 100%; box-sizing: border-box; height: 32px; padding: 0 8px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; outline: none;" type="text" id="filterText" placeholder="Filter..."/>
    </div>`;

        const listener = (event) => {
            this.filterText = event.target.value;
            params.filterChangedCallback();
        };

        this.eFilterText = this.gui.querySelector('#filterText');
        this.eFilterText.addEventListener('input', listener);
        this.eFilterText.addEventListener('keydown', listener);
        this.eFilterText.addEventListener('focus', () => {
            this.eFilterText.style.border = '1px solid #3b82f6';
            this.eFilterText.style.boxShadow = '0 0 0 2px rgba(59,130,246,0.2)';
        });
        this.eFilterText.addEventListener('blur', () => {
            this.eFilterText.style.border = '1px solid #d1d5db';
            this.eFilterText.style.boxShadow = 'none';
        });
    }

    getGui() {
        return this.gui;
    }

    doesFilterPass(params) {
        const value = params.node.data.name;
        if (!this.filterText) return true;
        return Boolean(
            value && value.match(new RegExp(`\\b${this.filterText}\\b`, 'i'))
        );
    }

    isFilterActive() {
        return this.filterText != null && this.filterText !== '';
    }

    getModel() {
        return { value: this.filterText };
    }

    setModel(model) {
        this.filterText = model ? model.value : null;
        if (this.eFilterText) {
            this.eFilterText.value = this.filterText || '';
        }
    }
}
