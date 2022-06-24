import React, {useMemo, useState} from 'react';
import {useGetAccountsQuery} from "./accountApiSlice";

import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";

import {columns} from "./accountColumns";
import Subheader from "../../components/Subheader";
import {useNavigate} from "react-router-dom";
import NoResults from "../../components/NoResults";
import Spinner from "../../app/Spinner";

const AccountsList = ({user}) => {
    const navigate = useNavigate();

    const {
        data: accounts,
        isLoading,
        isSuccess
    } = useGetAccountsQuery();


    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = accounts?.filter(
        item => item.id !== user?.id &&
            (item.title && item.title.toLowerCase().includes(filterText.toLowerCase())),
    );

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        const createNew = () => {
            navigate("/accounts/create");
        }

        return (
            <div>
                <Subheader onFilter={e => setFilterText(e.target.value)} onClear={handleClear}
                           filterText={filterText} onCreate={createNew} user={user}/>
            </div>
        );
    }, [filterText, resetPaginationToggle]);

    const openSelected = (id) => {
        navigate(`/accounts/view/${id}`);
    }

    return (
        <>
            {isLoading ? (<Spinner/>) : (
                <div className="container">
                    <DataTable
                        title="Користувачі"
                        columns={columns}
                        data={filteredItems}
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
                        defaultSortAsc={false}
                    />
                </div>
            )}
        </>
    );
};

export default AccountsList;