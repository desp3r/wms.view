import React from 'react';
import {useMemo, useState} from "react";
import Subheader from "../../components/Subheader";
import {useGetOrdersQuery} from "./ordersApiSlice";
import Spinner from "../../app/Spinner";
import DataTable from "react-data-table-component";
import {columns, conditionalRowStyles} from "./orderColumns"
import NoResults from "../../components/NoResults";
import {useNavigate} from "react-router-dom";


const OrdersList = () => {
    const navigate = useNavigate();

    const {
        data: orders,
        isLoading
    } = useGetOrdersQuery()

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = orders?.filter(
        item => item.productTitle && item.productTitle.toLowerCase().includes(filterText.toLowerCase()),
    );

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <div>
                <Subheader onFilter={e => setFilterText(e.target.value)} onClear={handleClear}
                           filterText={filterText}/>
            </div>
        );
    }, [filterText, resetPaginationToggle]);

    const openSelected = (row) => {
        navigate(`/orders/view/${row.id}`, {state: {order: row}});
    }

    return (
        <>
            {isLoading ? (<Spinner/>) : (
                <div className="container">
                    <DataTable
                        title="Замовлення"
                        columns={columns}
                        data={filteredItems}
                        conditionalRowStyles={conditionalRowStyles}
                        data-tag="allowRowEvents"
                        pagination
                        paginationResetDefaultPage={resetPaginationToggle}
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5,10,15,20]}
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                        persistTableHead
                        highlightOnHover={true}
                        pointerOnHover={true}
                        onRowClicked={(row, e) => openSelected(row)}
                        paginationComponentOptions={{
                            rowsPerPageText: 'Кількість рядків:',
                            rangeSeparatorText: 'з',
                            noRowsPerPage: false,
                            selectAllRowsItem: false,
                            selectAllRowsItemText: 'All'
                        }}
                        noDataComponent={<NoResults/>}
                        fixedHeader={true}
                        defaultSortAsc={false}
                    />
                </div>
            )}
        </>
    );
};

export default OrdersList;