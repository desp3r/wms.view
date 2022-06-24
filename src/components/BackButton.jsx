import React from 'react';
import {useNavigate} from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <div><div className="d-flex">
            <button className="btn btn-outline-black ms-3"
                    onClick={navigate.goBack}>
                <i className="bi bi-arrow-left"></i>
            </button>
        </div>

        </div>
    );
};

export default BackButton;