<script>
    import Router from 'svelte-spa-router';
    import HomePage from './routes/HomePage.svelte';
    import HandsontableGridPage from './routes/HandsontableGridPage.svelte';
    import NotFoundPage from './routes/NotFoundPage.svelte';
    import DataTablesPage from './routes/DataTablesPage.svelte';
    import AgGridPage from './routes/AgGridPage.svelte';

    let routes = {
        '/': HomePage,
        '/handsontable': HandsontableGridPage,
        '/data-tables': DataTablesPage,
        '/ag-grid': AgGridPage,

        '*': NotFoundPage
    };
</script>

<div id="app">
    <header>
        <nav>
            <div class="title">Handsontable vs AG Grid vs DataTables</div>
            <div class="nav-link">
                <a href="#/">Home</a>
            </div>
            <div class="nav-link">
                <a href="#/handsontable">Handsontable</a>
            </div>
            <div class="nav-link">
                <a href="#/ag-grid">AG Grid</a>
            </div>
            <div class="nav-link">
                <a href="#/data-tables">DataTables</a>
            </div>
        </nav>
    </header>

    <main>
        <Router {routes} />
    </main>
</div>

<style>
    #app {
        display: grid;
        grid-template-rows: auto 1fr;
        min-height: 100vh;
        max-width: 1400px;
        margin: 0 auto;
        padding: 0px 2rem 1.45rem;
        overflow-x: hidden;
    }

    nav {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.25rem;
        padding: 1rem 0;
        border-bottom: 1px solid var(--beige);
    }

    .title {
        margin-right: auto;
        font-weight: 700;
        font-size: 0.95rem;
        letter-spacing: -0.01em;
        color: var(--dark-grey);
    }

    nav :global(.nav-link a) {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-muted);
        padding: 0.4rem 0.75rem;
        border-radius: 0.375rem;
        transition:
            background 0.15s ease,
            color 0.15s ease;
    }

    nav :global(.nav-link a:hover) {
        background-color: var(--light-grey);
        color: var(--dark-grey);
    }

    main {
        padding: 2rem 0;
    }
</style>
