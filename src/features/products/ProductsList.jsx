import React, {useMemo, useState} from 'react';
import {useGetProductsQuery} from "./productsApiSlice";

import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";

import {columns} from "./productColumns";
import Subheader from "../../components/Subheader";
import {useNavigate} from "react-router-dom";
import NoResults from "../../components/NoResults";
import Spinner from "../../app/Spinner";

const ProductsList = ({user}) => {
    const navigate = useNavigate();

    const {
        data: products,
        isLoading,
        isSuccess
    } = useGetProductsQuery();


    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = products?.filter(
        item => (item.title && item.title.toLowerCase().includes(filterText.toLowerCase())) ||
            (item.brand && item.brand.toLowerCase().includes(filterText.toLowerCase())),
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
                           filterText={filterText} onCreate={createNew} user={user}/>
            </div>
        );
    }, [filterText, resetPaginationToggle]);

    const openSelected = (id) => {
        navigate(`/products/view/${id}`);
    }



    return (
        <>
            {isLoading ? (<Spinner/>) : (
                <div className="container">
                    <DataTable
                        title="Продукти"
                        columns={columns}
                        data={filteredItems}
                        data-tag="allowRowEvents"
                        pagination
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5,10,15,20]}
                        paginationResetDefaultPage={resetPaginationToggle}
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
            )}
        </>
    );
};

export default ProductsList;