import React from 'react';
import Modal from "../../components/Modal";

const WarehouseSubheader = ({filterText, onFilter, onClear, children}) => {
    return (
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

                <button type="button"
                        className="btn btn-outline-success ms-4"
                        data-bs-toggle="modal"
                        data-bs-target="#createSlot">
                    Створити
                </button>
            </form>

            <Modal id="createSlot"
                   label="createSlotLabel"
                   children={children}/>
        </>
    );
};

export default WarehouseSubheader;