<script>
    import 'datatables.net-dt/css/dataTables.dataTables.min.css';
    import jQuery from 'jquery';
    import DataTable from 'datatables.net';
    import 'datatables.net-buttons';
    import 'datatables.net-buttons/js/buttons.html5.mjs';
    import { onDestroy, onMount } from 'svelte';

    let tableEl = $state();
    let table = null;

    onMount(() => {
        table = new DataTable(tableEl, {
            paging: false,
            ajax: {
                url: '/data/data.json',
                dataSrc: 'data'
            },
            columns: [
                { data: 'name' },
                { data: 'city' },
                { data: 'team' },
                { data: 'score' },
                { data: 'percentWins' }
            ],
            dom: "<'dt-header'fB>rtip",
            buttons: [
                { extend: 'csv', text: 'EXPORT TO CSV', filename: 'players' }
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
    <table bind:this={tableEl} class="display">
        <thead>
            <tr>
                <th>Name</th>
                <th>City</th>
                <th>Team</th>
                <th>Score</th>
                <th>Percent wins</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</div>

<style>
    .grid-wrapper {
        flex: 1;
        min-width: 0;
    }

    :global(.dt-header) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 0.5rem;
    }
</style>
