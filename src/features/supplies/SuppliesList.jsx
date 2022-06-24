import React from 'react';
import {useGetSuppliesQuery} from "./suppliesApiSlice";
import {useMemo, useState} from "react";
import SubheaderWithModal from "../../components/SubheaderWithModal";
import SupplyCreate from "./SupplyCreate";
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import {columns, conditionalRowStyles} from "./suppliesColumns"
import NoResults from "../../components/NoResults";
import Supply from "./Supply";
import Spinner from "../../app/Spinner";

const SuppliesList = ({user}) => {

    const {
        data: supplies,
        isLoading,
        isSuccess
    } = useGetSuppliesQuery();

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = supplies?.filter(
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
                                    btnLabel={"Замовити"}
                                    user={user}>

                    <SupplyCreate/>
                </SubheaderWithModal>
            </div>
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <>
            {isLoading ? (<Spinner/>) : (
                <div className="container">
                    <DataTable
                        title="Постачання"
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
                        expandableRowsComponent={Supply}
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

export default SuppliesList;