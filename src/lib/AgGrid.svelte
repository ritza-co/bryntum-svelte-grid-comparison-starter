<script>
  import { onDestroy, onMount } from "svelte";
  import { createGrid } from "ag-grid-community";
  import "ag-grid-community/styles/ag-grid.css";
  import "ag-grid-community/styles/ag-theme-alpine.css";
  import { PersonFilter } from "./personFilter";

  let gridApi = null;
  let gridContainer;
  let canEdit = true;

  function getColumnDefs() {
    return [
      {
        field: "name",
        headerName: "NAME",
        filter: "personFilter",
        rowDrag: (params) => !params.node.group,
        editable: true,
        aggFunc: (params) => {
          return `Total: ${params.values.length}`;
        },
      },
      {
        field: "city",
        headerName: "CITY",
        width: 220,
        editable: true,
        aggFunc: (params) => {
          const valueCount = {};
          params.values.forEach((value) => {
            valueCount[value] = (valueCount[value] || 0) + 1;
          });
          const mostEntries = Object.keys(valueCount).reduce((a, b) =>
            valueCount[a] > valueCount[b] ? a : b
          );
          return `Most entries: ${mostEntries} (${valueCount[mostEntries]})`;
        },
      },
      {
        field: "team",
        headerName: "TEAM",
        width: 250,
        editable: true,
        aggFunc: (params) => {
          const valueCount = {};
          params.values.forEach((value) => {
            valueCount[value] = (valueCount[value] || 0) + 1;
          });
          const mostEntries = Object.keys(valueCount).reduce((a, b) =>
            valueCount[a] > valueCount[b] ? a : b
          );
          return `Most entries: ${mostEntries} (${valueCount[mostEntries]})`;
        },
      },
      {
        field: "score",
        headerName: "SCORE",
        editable: true,
        aggFunc: (params) => {
          let min = null;
          let max = null;
          params.values.forEach((value) => {
            if (min === null || value < min) min = value;
            if (max === null || value > max) max = value;
          });
          return `Min ${min} Max ${max}`;
        },
      },
      {
        field: "percentWins",
        headerName: "PERCENT WINS",
        editable: true,
        aggFunc: (params) => {
          const sum = params.values.reduce((a, b) => a + Number(b), 0);
          return `Average: ${Math.round(sum / params.values.length)}%`;
        },
      },
    ];
  }

  const gridOptions = {
    columnDefs: getColumnDefs(),
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true,
    },
    rowSelection: { mode: "multiRow" },
    animateRows: true,
    rowDragManaged: true,
    groupTotalRow: "bottom",
    components: {
      personFilter: PersonFilter,
    },
  };

  onMount(() => {
    gridApi = createGrid(gridContainer, gridOptions);

    fetch("data/data.json")
      .then((res) => res.json())
      .then(({ data }) => {
        gridApi.setGridOption("rowData", data);
      });
  });

  onDestroy(() => {
    if (gridApi) {
      gridApi.destroy();
    }
  });
</script>

<div class="toolbar">
  <button
    class="btn add-btn"
    on:click={() => gridApi.applyTransaction({ add: [{}] })}
    disabled={!canEdit}
  >
    ADD
  </button>

  <button
    class="btn add-btn"
    on:click={() => gridApi.applyTransaction({ add: [{}], addIndex: 0 })}
    disabled={!canEdit}
  >
    INSERT
  </button>

  <button
    class="btn remove-btn"
    on:click={() => {
      const selectedRows = gridApi.getSelectedRows();
      gridApi.applyTransaction({ remove: selectedRows });
    }}
    disabled={!canEdit}
  >
    REMOVE
  </button>

  <button
    class="btn"
    on:click={() => gridApi.setFilterModel(null)}
  >
    REMOVE ALL FILTERS
  </button>

  <button
    class="btn read-only-btn"
    on:click={() => {
      canEdit = !canEdit;
      const columnDefs = getColumnDefs();
      columnDefs.forEach((colDef) => {
        colDef.editable = canEdit;
      });
      gridApi.setGridOption("columnDefs", columnDefs);
    }}
  >
    {canEdit ? "○" : "✓"} READ-ONLY
  </button>
</div>

<div
  id="datagrid"
  class="ag-theme-alpine"
  style="height: 500px; width: 800px;"
  bind:this={gridContainer}
/>

<style>
  .ag-theme-alpine {
    --ag-foreground-color: var(--dark-grey);
    --ag-header-foreground-color: var(--dark-grey);
  }

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
