<script>
    import { onDestroy, onMount } from 'svelte';
    import {
        createGrid,
        ModuleRegistry,
        AllCommunityModule,
        themeQuartz
    } from 'ag-grid-community';
    import './toolbar.css';

    ModuleRegistry.registerModules([AllCommunityModule]);

    let gridApi = null;
    let gridContainer = $state();

    const gridOptions = {
        columnDefs: [
            { field: 'name', headerName: 'NAME' },
            { field: 'city', headerName: 'CITY', width: 220 },
            { field: 'team', headerName: 'TEAM', width: 250 },
            { field: 'score', headerName: 'SCORE' },
            { field: 'percentWins', headerName: 'PERCENT WINS', width: 180 }
        ],
        defaultColDef: {
            sortable: true,
            filter: true,
            resizable: true
        },
        theme: themeQuartz.withParams({
            fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
            fontSize: 13,
            rowHeight: 36,
            headerHeight: 38,
            headerBackgroundColor: '#f8fafc',
            headerTextColor: '#374151',
            foregroundColor: '#374151',
            borderColor: '#e5e7eb',
            rowHoverColor: '#eff6ff',
            selectedRowBackgroundColor: '#dbeafe',
            oddRowBackgroundColor: '#fafafa',
            backgroundColor: '#ffffff'
        }),
        domLayout: 'autoHeight'
    };

    onMount(() => {
        gridApi = createGrid(gridContainer, gridOptions);
    });

    onDestroy(() => {
        if (gridApi) {
            gridApi.destroy();
        }
    });
</script>

<div class="grid-wrapper">
    <div style="width: 100%;" bind:this={gridContainer}></div>
</div>

<style>
    .grid-wrapper {
        flex: 1;
        min-width: 0;
    }
</style>
