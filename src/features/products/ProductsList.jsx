import React, {useMemo, useState} from 'react';
import {useGetProductsQuery} from "./productsApiSlice";

import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";

import {columns} from "./dataColumns";
import Subheader from "../../components/Subheader";
import {useNavigate} from "react-router-dom";
import NoResults from "../../components/NoResults";

const Products = () => {
    const navigate = useNavigate();

    const {
        data: products,
        isLoading,
        isSuccess
    } = useGetProductsQuery();

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = products?.filter(
        item => item.title && item.title.toLowerCase().includes(filterText.toLowerCase()),
    );

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        const createNew = () => {
            navigate("/products/create");
        }

        return (
            <div>
                <Subheader onFilter={e => setFilterText(e.target.value)} onClear={handleClear}
                           filterText={filterText} onCreate={createNew}/>
            </div>
        );
    }, [filterText, resetPaginationToggle]);

    const openSelected = (id) => {
        navigate(`/products/view/${id}`);
    }



    return (
        <div className="container">
            <DataTable
                title="Список продуктів"
                columns={columns}
                data={filteredItems}
                data-tag="allowRowEvents"
                pagination
                paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                persistTableHead
                highlightOnHover={true}
                pointerOnHover={true}
                onRowClicked={(row, e) => openSelected(row.id)}
                paginationComponentOptions={{
                    rowsPerPageText: 'Кількість рядків:',
                    rangeSeparatorText: 'з',
                    noRowsPerPage: false,
                    selectAllRowsItem: false,
                    selectAllRowsItemText: 'All'
                }}
                noDataComponent={<NoResults/>}
                fixedHeader={true}
            />
        </div>

    );
};

export default Products;