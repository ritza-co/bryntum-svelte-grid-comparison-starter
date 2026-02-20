<script>
  import { onDestroy, onMount } from "svelte";
  import Handsontable from "handsontable";
  import "handsontable/dist/handsontable.full.min.css";
  import * as XLSX from "xlsx";

  let containerEl;
  let hot = null;
  let newPlayerCount = 0;
  let isReadOnly = false;

  onMount(() => {
    hot = new Handsontable(containerEl, {
      colHeaders: ["Name", "City", "Team", "Score", "Percent Wins"],
      columns: [
        { data: "name" },
        { data: "city" },
        { data: "team" },
        { data: "score", type: "numeric" },
        { data: "percentWins", type: "numeric" },
      ],
      rowHeaders: true,
      height: 500,
      width: 800,
      licenseKey: "non-commercial-and-evaluation",
      columnSorting: true,
      filters: true,
      dropdownMenu: true,
      manualRowMove: true,
      manualColumnMove: true,
      stretchH: "all",
      columnSummary: [
        {
          sourceColumn: 0,
          type: "count",
          destinationRow: 0,
          destinationColumn: 0,
          reversedRowCoords: true,
          customFunction(endpoint) {
            return `Total: ${endpoint.count}`;
          },
        },
        {
          sourceColumn: 3,
          type: "min",
          destinationRow: 0,
          destinationColumn: 3,
          reversedRowCoords: true,
          customFunction() {
            const values = hot
              .getDataAtCol(3)
              .filter((v) => v !== null && v !== "")
              .map(Number);
            const min = Math.min(...values);
            const max = Math.max(...values);
            return `Min ${min} Max ${max}`;
          },
        },
        {
          sourceColumn: 4,
          type: "average",
          destinationRow: 0,
          destinationColumn: 4,
          reversedRowCoords: true,
          customFunction(endpoint) {
            return `Average: ${Math.round(endpoint.average)}%`;
          },
        },
      ],
    });

    fetch("/data/data.json")
      .then((res) => res.json())
      .then(({ data }) => {
        hot.updateData(data);
      });
  });

  onDestroy(() => {
    if (hot) {
      hot.destroy();
    }
  });
</script>

<div class="toolbar">
  <button
    class="btn add-btn"
    on:click={() => {
      newPlayerCount++;
      const lastRow = hot.countRows() - 1;
      hot.alter("insert_row_below", lastRow);
      hot.setDataAtRowProp(hot.countRows() - 1, "name", `New player ${newPlayerCount}`);
    }}
  >
    ADD
  </button>

  <button
    class="btn add-btn"
    on:click={() => {
      newPlayerCount++;
      hot.alter("insert_row_above", 0);
      hot.setDataAtRowProp(0, "name", `New player ${newPlayerCount}`);
    }}
  >
    INSERT
  </button>

  <button
    class="btn remove-btn"
    on:click={() => {
      const selected = hot.getSelected();
      if (selected && selected.length) {
        const rowIndex = selected[0][0];
        hot.alter("remove_row", rowIndex);
      }
    }}
  >
    REMOVE
  </button>

  <button
    class="btn"
    on:click={() => {
      const filtersPlugin = hot.getPlugin("filters");
      filtersPlugin.clearConditions();
      filtersPlugin.filter();
    }}
  >
    REMOVE ALL FILTERS
  </button>

  <button
    class="btn read-only-btn"
    on:click={() => {
      isReadOnly = !isReadOnly;
      hot.updateSettings({ readOnly: isReadOnly });
    }}
  >
    {isReadOnly ? "✓" : "○"} READ-ONLY
  </button>

  <button
    class="btn"
    on:click={() => {
      const data = hot.getData();
      const headers = ["Name", "City", "Team", "Score", "Percent Wins"];
      const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Players");
      XLSX.writeFile(workbook, "players.xlsx");
    }}
  >
    EXPORT TO EXCEL
  </button>
</div>

<div bind:this={containerEl}></div>

<style>
  .toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    width: 800px;
    background-color: var(--light-grey);
    padding: 0.5rem;
  }

  .btn {
    display: flex;
    gap: 0.3rem;
    align-items: center;
    padding: 0.75rem;
    border-radius: 2px;
    color: var(--dark-grey);
    border: 1px solid var(--medium-grey);
    transition: all 0.3s ease;
    cursor: pointer;
    background-color: white;
    font-size: 0.85rem;
  }

  .btn:hover {
    filter: brightness(115%);
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .add-btn {
    color: var(--green);
    border: 1px solid var(--light-green);
  }

  .remove-btn {
    color: var(--red);
    border: 1px solid var(--light-red);
  }
</style>
