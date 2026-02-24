<script>
    import { onDestroy, onMount } from 'svelte';
    import {
        createGrid,
        ModuleRegistry,
        AllCommunityModule,
        themeQuartz
    } from 'ag-grid-community';
    import { PersonFilter } from './personFilter';
    import './toolbar.css';

    ModuleRegistry.registerModules([AllCommunityModule]);

    let gridApi = null;
    let gridContainer = $state();
    let canEdit = $state(true);

    function getColumnDefs() {
        return [
            {
                field: 'name',
                headerName: 'NAME',
                filter: 'personFilter',
                rowDrag: (params) => !params.node.group,
                editable: true
            },
            {
                field: 'city',
                headerName: 'CITY',
                width: 220,
                editable: true
            },
            {
                field: 'team',
                headerName: 'TEAM',
                width: 250,
                editable: true
            },
            {
                field: 'score',
                headerName: 'SCORE',
                editable: true,
                cellDataType: false
            },
            {
                field: 'percentWins',
                headerName: 'PERCENT WINS',
                width: 180,
                editable: true,
                cellDataType: false
            }
        ];
    }

    const gridOptions = {
        columnDefs: getColumnDefs(),
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
        rowSelection: 'multiple',
        rowDragManaged: true,
        domLayout: 'autoHeight',
        components: {
            personFilter: PersonFilter
        }
    };

    onMount(() => {
        gridApi = createGrid(gridContainer, gridOptions);

        fetch('data/data.json')
            .then((res) => res.json())
            .then(({ data }) => {
                const scores = data.map((r) => r.score);
                const wins = data.map((r) => r.percentWins);
                const summaryRow = {
                    name: `Total: ${data.length}`,
                    city: '',
                    team: '',
                    score: `Min ${Math.min(...scores)} Max ${Math.max(...scores)}`,
                    percentWins: `Avg: ${Math.round(wins.reduce((a, b) => a + b, 0) / wins.length)}%`
                };
                gridApi.setGridOption('rowData', [...data, summaryRow]);
            });
    });

    onDestroy(() => {
        if (gridApi) {
            gridApi.destroy();
        }
    });
</script>

<div class="grid-wrapper">
    <div class="toolbar">
        <button
            class="btn add-btn"
            onclick={() => gridApi.applyTransaction({ add: [{}] })}
            disabled={!canEdit}
        >
            ADD
        </button>

        <button
            class="btn add-btn"
            onclick={() => gridApi.applyTransaction({ add: [{}], addIndex: 0 })}
            disabled={!canEdit}
        >
            INSERT
        </button>

        <button
            class="btn remove-btn"
            onclick={() => {
                const selectedRows = gridApi.getSelectedRows();
                gridApi.applyTransaction({ remove: selectedRows });
            }}
            disabled={!canEdit}
        >
            REMOVE
        </button>

        <button class="btn" onclick={() => gridApi.setFilterModel(null)}>
            REMOVE ALL FILTERS
        </button>

        <button
            class="btn read-only-btn"
            onclick={() => {
                canEdit = !canEdit;
                const columnDefs = getColumnDefs();
                columnDefs.forEach((colDef) => {
                    colDef.editable = canEdit;
                });
                gridApi.setGridOption('columnDefs', columnDefs);
            }}
        >
            READ-ONLY: {canEdit ? 'OFF' : 'ON'}
        </button>

        <button
            class="btn"
            onclick={() => gridApi.exportDataAsCsv({ fileName: 'players.csv' })}
        >
            EXPORT TO CSV
        </button>
    </div>

    <div id="datagrid" style="width: 100%;" bind:this={gridContainer}></div>
</div>

<style>
    .grid-wrapper {
        flex: 1;
        min-width: 0;
    }
</style>
