const FilterComponent = ({filterText, onFilter, onClear}) => (
    <>
        <form className="d-flex">
            <input
                className="form-control mr-2"
                type="text"
                placeholder="Пошук..."
                aria-label="Пошук..."
                id="search"
                value={filterText}
                onChange={onFilter}
            />
            <button
                className="btn btn-outline-dark ms-2"
                type="button" onClick={onClear}>
                Очистити
            </button>
        </form>
    </>
);

export default FilterComponent;