<script>
    import 'datatables.net-dt/css/dataTables.dataTables.min.css';
    import DataTable from 'datatables.net-dt';
    import { onDestroy, onMount } from 'svelte';

    let tableEl = $state();
    let table = null;

    onMount(() => {
        table = new DataTable(tableEl, {
            paging: false,
            columns: [
                { data: 'name', title: 'Name' },
                { data: 'city', title: 'City' },
                { data: 'team', title: 'Team' },
                { data: 'score', title: 'Score' },
                { data: 'percentWins', title: 'Percent Wins' }
            ]
        });
    });

    onDestroy(() => {
        if (table) {
            table.destroy();
        }
    });
</script>

<div class="grid-wrapper">
    <table bind:this={tableEl} class="display" style="width: 100%"></table>
</div>

<style>
    .grid-wrapper {
        flex: 1;
        min-width: 0;
    }
</style>
