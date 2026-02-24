<div class="container">
    <h1>Handsontable vs. AG Grid vs. DataTables</h1>
    <p class="subtitle">
        A feature comparison of three JavaScript data grid libraries using
        Svelte
    </p>
    <div class="img-container">
        <a href="#/handsontable" class="card">
            <img src="images/handsontable.png" alt="Handsontable table" />
            <div class="card-label">Handsontable</div>
        </a>
        <a href="#/ag-grid" class="card">
            <img src="images/ag-grid.png" alt="AG Grid table" />
            <div class="card-label">AG Grid</div>
        </a>
        <a href="#/data-tables" class="card">
            <img src="images/datatables.png" alt="DataTables table" />
            <div class="card-label">DataTables</div>
        </a>
    </div>
</div>

<style>
    .container {
        text-align: center;
        padding-top: 2rem;
    }

    h1 {
        font-size: 1.75rem;
        font-weight: 700;
        letter-spacing: -0.03em;
        color: #111827;
    }

    .subtitle {
        margin-top: 0.5rem;
        color: #6b7280;
        font-size: 0.95rem;
    }

    .img-container {
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
        justify-content: center;
        gap: 1.25rem;
        padding: 2.5rem 1rem;
    }

    .card {
        display: flex;
        flex-direction: column;
        border: 1px solid #e5e7eb;
        border-radius: 0.75rem;
        overflow: hidden;
        text-decoration: none;
        background: white;
        transition:
            box-shadow 0.2s ease,
            transform 0.2s ease;
        width: 220px;
    }

    .card:hover {
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
    }

    .card img {
        height: 130px;
        width: 100%;
        object-fit: cover;
        border-bottom: 1px solid #e5e7eb;
    }

    .card-label {
        padding: 0.75rem 1rem;
        font-size: 0.9rem;
        font-weight: 600;
        color: #374151;
        text-align: center;
    }
</style>
