import React from 'react';

const ItemHeader = ({mode, type, title, onEditBtnClick, onDelBtnClick, onSubmitBtn, onCancelBtn}) => {

    const ViewHeader = () => (
        <div className="d-flex">
            <h2>{title}</h2>
            <button className="btn btn-outline-info ms-3"
                    onClick={onEditBtnClick}>
                <i className="bi bi-pencil"></i>
            </button>
            <button className="btn btn-outline-danger ms-2"
                    onClick={onDelBtnClick}>
                <i className="bi bi-trash"></i>
            </button>
        </div>
    );

    const UpdateHeader = () => (
        <div className="d-flex">
            <h2>{`Update ${type}`}</h2>
            <button className="btn btn-outline-success ms-3"
                    onClick={onEditBtnClick}>
                <i className="bi bi-check-lg"></i>
            </button>
            <button className="btn btn-outline-danger ms-2"
                    onClick={onDelBtnClick}>
                <i className="bi bi-x-lg"></i>
            </button>
        </div>
    )

    const CreateHeader = () => (
        <div className="d-flex">
            <h2>{`Create ${type}`}</h2>
            <button className="btn btn-outline-success ms-3"
                    onClick={onEditBtnClick}>
                <i className="bi bi-check"></i>
            </button>
            <button className="btn btn-outline-danger ms-2"
                    onClick={onDelBtnClick}>
                <i className="bi bi-x"></i>
            </button>
        </div>
    )

    return (
        <div>
            {mode === "VIEW_MODE" && <ViewHeader/>}
            {mode === "UPDATE_MODE" && <UpdateHeader/>}
            {mode === "CREATE_MODE" && <CreateHeader/>}
        </div>
    );
};

export default ItemHeader;