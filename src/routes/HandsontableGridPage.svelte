<script>
  import HandsontableGrid from "../lib/HandsontableGrid.svelte";
</script>

<div class="page-container">
  <div class="page-text-container">
    <h1 class="page-title">Handsontable</h1>
    <p>This Handsontable table has the following features:</p>
    <ul>
      <li>Filtering and sorting</li>
      <li>Cell editing</li>
      <li>Adding and deleting rows</li>
      <li>Row and column re-ordering</li>
      <li>Read-only toggle</li>
      <li>Summary row</li>
      <li>Export to Excel</li>
    </ul>

    <div class="page-btn-container">
      <a
        href="https://handsontable.com/docs/javascript-data-grid/demo/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button>View all available features</button>
      </a>
    </div>
  </div>

  <HandsontableGrid />
</div>
