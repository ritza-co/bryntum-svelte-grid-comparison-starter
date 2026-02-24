<script>
    import { onDestroy, onMount } from 'svelte';
    import Handsontable from 'handsontable';
    import 'handsontable/styles/handsontable.min.css';
    import 'handsontable/styles/ht-theme-horizon.min.css';
    import './toolbar.css';

    let containerEl = $state();
    let hot = null;
    let newPlayerCount = 0;
    let isReadOnly = $state(false);

    onMount(() => {
        hot = new Handsontable(containerEl, {
            colHeaders: ['Name', 'City', 'Team', 'Score', 'Percent Wins'],
            columns: [
                { data: 'name' },
                { data: 'city' },
                { data: 'team' },
                { data: 'score' },
                { data: 'percentWins' }
            ],
            rowHeaders: true,
            height: 'auto',
            width: '100%',
            licenseKey: 'non-commercial-and-evaluation',
            themeName: 'ht-theme-horizon',
            columnSorting: true,
            filters: true,
            dropdownMenu: true,
            manualRowMove: true,
            manualColumnMove: true,
            stretchH: 'all'
        });

        fetch('/data/data.json')
            .then((res) => res.json())
            .then(({ data }) => {
                // Calculate summary values
                const scores = data.map((r) => r.score);
                const wins = data.map((r) => r.percentWins);
                const summaryRow = {
                    name: `Total: ${data.length}`,
                    city: '',
                    team: '',
                    score: `Min ${Math.min(...scores)} Max ${Math.max(...scores)}`,
                    percentWins: `Avg: ${Math.round(wins.reduce((a, b) => a + b, 0) / wins.length)}%`
                };
                hot.updateData([...data, summaryRow]);
            });
    });

    onDestroy(() => {
        if (hot) {
            hot.destroy();
        }
    });
</script>

<div class="grid-wrapper">
    <div class="toolbar">
        <button
            class="btn add-btn"
            onclick={() => {
                newPlayerCount++;
                const lastRow = hot.countRows() - 1;
                hot.alter('insert_row_below', lastRow);
                hot.setDataAtRowProp(
                    hot.countRows() - 1,
                    'name',
                    `New player ${newPlayerCount}`
                );
            }}
        >
            ADD
        </button>

        <button
            class="btn add-btn"
            onclick={() => {
                newPlayerCount++;
                hot.alter('insert_row_above', 0);
                hot.setDataAtRowProp(0, 'name', `New player ${newPlayerCount}`);
            }}
        >
            INSERT
        </button>

        <button
            class="btn remove-btn"
            onclick={() => {
                const selected = hot.getSelected();
                if (selected && selected.length) {
                    const rowIndex = selected[0][0];
                    hot.alter('remove_row', rowIndex);
                }
            }}
        >
            REMOVE
        </button>

        <button
            class="btn"
            onclick={() => {
                const filtersPlugin = hot.getPlugin('filters');
                filtersPlugin.clearConditions();
                filtersPlugin.filter();
            }}
        >
            REMOVE ALL FILTERS
        </button>

        <button
            class="btn read-only-btn"
            onclick={() => {
                isReadOnly = !isReadOnly;
                hot.updateSettings({ readOnly: isReadOnly });
            }}
        >
            READ-ONLY: {isReadOnly ? 'ON' : 'OFF'}
        </button>

        <button
            class="btn"
            onclick={() => {
                const exportPlugin = hot.getPlugin('exportFile');
                exportPlugin.downloadFile('csv', { filename: 'players' });
            }}
        >
            EXPORT TO CSV
        </button>
    </div>

    <div bind:this={containerEl}></div>
</div>

<style>
    .grid-wrapper {
        flex: 1;
        min-width: 0;
    }
</style>
