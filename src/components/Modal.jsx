import React from 'react';

const Modal = ({id, label, children}) => {
    return (
            <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={label} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Modal;