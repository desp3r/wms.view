import React from 'react';
import {useGetSlotsByProductQuery} from "../warehouse/warehouseApiSlice";
import NoResults from "../../components/NoResults";
import DataTable from "react-data-table-component";

import {columns, conditionalRowStyles} from "./selectionColumns";
import Spinner from "../../app/Spinner";

const FromSlotsSelection = ({productId, selected, onSelected, mComponent, selectedSlots}) => {

    const {
        data: slots,
        isLoading
    } = useGetSlotsByProductQuery(productId);

    const data = slots ? JSON.parse(JSON.stringify(slots)) : null;

    const filterEmpty = (value) => {
        for (let i = 0; i < selectedSlots.length; i++){
            if (value.id === selectedSlots[i].id) {
                value.productCount = value.productCount - selectedSlots[i].productCount;
            }
        }
        return value;
    }

    const slots2 = selectedSlots ? data?.map((value) => filterEmpty(value)) : null;
    const filteredSlots = slots2 !== null ? slots2?.filter(item => item.productCount > 0) : slots?.filter(item => item.productCount !== 0)

    return (
        <>
            {isLoading ? (<Spinner/>) : (

                <>
                    {selected.id ? (
                        <DataTable
                            columns={columns}
                            data={filteredSlots}
                            conditionalRowStyles={conditionalRowStyles}
                            data-tag="allowRowEvents"
                            pagination
                            paginationIconFirstPage={null}
                            paginationIconLastPage={null}
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[5,10,15,20]}
                            paginationComponentOptions={{
                                rowsPerPageText: '',
                                rangeSeparatorText: 'з',
                                noRowsPerPage: true,
                                selectAllRowsItem: true,
                                selectAllRowsItemText: 'All'
                            }}
                            subHeader
                            subHeaderAlign="left"
                            subHeaderComponent={mComponent}
                            highlightOnHover={true}
                            pointerOnHover={true}
                            onRowClicked={row => onSelected(row)}
                            noDataComponent={<NoResults/>}
                            defaultSortAsc={false}
                        />
                    ) : (
                        <DataTable
                            columns={columns}
                            data={filteredSlots}
                            conditionalRowStyles={conditionalRowStyles}
                            data-tag="allowRowEvents"
                            pagination
                            paginationIconFirstPage={null}
                            paginationIconLastPage={null}
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[5,10,15,20]}
                            paginationComponentOptions={{
                                rowsPerPageText: '',
                                rangeSeparatorText: 'з',
                                noRowsPerPage: true,
                                selectAllRowsItem: true,
                                selectAllRowsItemText: 'All'
                            }}
                            highlightOnHover={true}
                            pointerOnHover={true}
                            onRowClicked={row => onSelected(row)}
                            noDataComponent={<NoResults/>}
                            defaultSortAsc={false}
                        />
                    )}
                </>


            )}
        </>
    );
};

export default FromSlotsSelection;