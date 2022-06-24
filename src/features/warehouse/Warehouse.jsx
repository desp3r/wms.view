import React from 'react';
import {useGetSlotsQuery} from "./warehouseApiSlice";
import {useMemo, useState} from "react";
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import NoResults from "../../components/NoResults";
import {columns, conditionalRowStyles} from "./warehouseColumns";
import SubheaderWithModal from "../../components/SubheaderWithModal";
import SlotCreate from "./SlotCreate";
import Slot from "./Slot";
import Spinner from "../../app/Spinner";

const Warehouse = ({user}) => {

    const {
        data: slots,
        isLoading,
        isSuccess
    } = useGetSlotsQuery();

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = slots?.filter(
        item => item.title && item.title.toLowerCase().includes(filterText.toLowerCase()),
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
                <SubheaderWithModal onFilter={e => setFilterText(e.target.value)}
                                    onClear={handleClear}
                                    filterText={filterText}
                                    user={user}>

                    <SlotCreate/>
                </SubheaderWithModal>
            </div>
        );
    }, [filterText, resetPaginationToggle]);


    return (
        <>
            {isLoading ? (<Spinner/>) :
                (<div className="container">
                    <DataTable
                        title="Склад"
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
                        expandableRows={true}
                        expandableRowsComponent={Slot}
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
                </div>)}
        </>
    );
};

export default Warehouse;