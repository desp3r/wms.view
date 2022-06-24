import React from 'react';
import {columns} from "./selectionColumns";
import NoResults from "../../components/NoResults";
import DataTable from "react-data-table-component";

const SelectedSlots = ({selectedSlots, onSelectedDelete}) => {
    return (
        <DataTable
            columns={columns}
            data={selectedSlots}
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
            onRowClicked={row => onSelectedDelete(row)}
            noDataComponent={<NoResults/>}
            defaultSortAsc={false}
        />
    );
};

export default SelectedSlots;