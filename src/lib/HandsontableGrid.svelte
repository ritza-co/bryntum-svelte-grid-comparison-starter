<script>
    import { onDestroy, onMount } from 'svelte';
    import Handsontable from 'handsontable';
    import 'handsontable/styles/handsontable.min.css';
    import 'handsontable/styles/ht-theme-horizon.min.css';
    import './toolbar.css';

    let containerEl = $state();
    let hot = null;

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
            stretchH: 'all'
        });
    });

    onDestroy(() => {
        if (hot) {
            hot.destroy();
        }
    });
</script>

<div class="grid-wrapper">
    <div bind:this={containerEl}></div>
</div>

<style>
    .grid-wrapper {
        flex: 1;
        min-width: 0;
    }
</style>
