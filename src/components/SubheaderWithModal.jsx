import React from 'react';
import Modal from "./Modal";
import {Role} from "../app/helpers/role";

const SubheaderWithModal = ({filterText, onFilter, onClear, children, btnLabel, user}) => {
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

                {(!btnLabel ? (user.role === Role.Admin || user.role === Role.Loader) :
                        (user.role === Role.Admin || user.role === Role.Manager)) &&
                    <button type="button"
                            className="btn btn-outline-success ms-2"
                            data-bs-toggle="modal"
                            data-bs-target="#createSlot">
                        {btnLabel ? btnLabel : "Створити"}
                    </button>
                }
            </form>

            <Modal id="createSlot"
                   label="createSlotLabel"
                   children={children}/>
        </>
    );
};

export default SubheaderWithModal;