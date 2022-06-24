import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import Modal from "../../components/Modal";
import TransferHandle from "./TransferHandle";
import Spinner from "../../app/Spinner";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../accounts/authSlice";
import {Role} from "../../app/helpers/role";
import {useDeleteSlotMutation} from "./warehouseApiSlice";
import {Toast} from "../../components/Toast";

const Slot = props => {
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const [deleteSlot] = useDeleteSlotMutation();

    const onSubmit = async () => {
        const {data: id} = await deleteSlot(props.data.id);
        if (id) {
            Toast("success", "Контейнер успішно видалено")
            navigate("/warehouse")
        }
    }

    return (
        <div>
            {!props ? (<Spinner/>) :
                (
                    <div>
                        <div className="container">
                            <Formik
                                initialValues={props.data}
                                onSubmit={onSubmit}>
                                {({errors, touched, isSubmitting, values}) => (
                                    <Form>
                                        <div className="d-flex">
                                            <h3 className="ms-5 mt-2">{`Контейнер ${values.title}`}</h3>
                                            <div className="ms-2 mt-2">
                                                <div className="ms-2 mt-1">

                                                    {(user.role === Role.Admin || user.role === Role.Loader) &&
                                                        <div>
                                                            {(user.role === Role.Admin || user.role === Role.Loader) &&
                                                                <button disabled={values.productCount === 0}
                                                                        className="btn btn-outline-success ms-2"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#handleTransfer"
                                                                        type="button">
                                                                    Переміщення
                                                                </button>
                                                            }
                                                            {(user.role === Role.Admin || user.role === Role.Loader) &&
                                                                <button disabled={values.productCount !== 0}
                                                                        className="btn btn-outline-danger ms-2"
                                                                        type="submit">
                                                                    <i className="bi bi-trash"></i>
                                                                </button>
                                                            }
                                                            <button className="btn btn-outline-info ms-2" id="goProd"
                                                                    onClick={() => navigate(`/products/view/${props.data.productId}`)}>
                                                                <i className="bi bi-clipboard2"></i>
                                                            </button>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex flex-row mb-2">
                                            <div className="d-flex justify-content-start ms-5 mb-1">
                                                <fieldset disabled={true}>
                                                    <div className="ms-2 me-2">
                                                        <label htmlFor="row"
                                                               className="col-form-label ms-1">Ряд</label>
                                                        <Field type="number"
                                                               id="row" name="row"
                                                               className={'form-control form-control-sm'}
                                                               aria-describedby="basic-addon3"/>
                                                        <label htmlFor="tier"
                                                               className="col-form-label ms-1">Ярус</label>
                                                        <Field type="number"
                                                               id="tier" name="tier"
                                                               className={'form-control form-control-sm'}
                                                               aria-describedby="basic-addon3"/>
                                                        <label htmlFor="box"
                                                               className="col-form-label ms-1">Контейнер</label>
                                                        <Field type="number"
                                                               id="box" name="box"
                                                               className={'form-control form-control-sm'}
                                                               aria-describedby="basic-addon3"/>
                                                    </div>
                                                </fieldset>
                                            </div>
                                            <div className="d-flex justify-content-start ms-5 mb-1">
                                                <fieldset disabled={true}>
                                                    <div className="ms-2 me-2">
                                                        <label htmlFor="size"
                                                               className="col-form-label ms-1">Розмір</label>
                                                        <Field type="number"
                                                               id="size" name="size"
                                                               className={'form-control form-control-sm'}
                                                               aria-describedby="basic-addon3"/>
                                                        <label htmlFor="placeLeft"
                                                               className="col-form-label ms-1">Вільного місця</label>
                                                        <Field type="number"
                                                               id="placeLeft" name="placeLeft"
                                                               className={'form-control form-control-sm'}
                                                               aria-describedby="basic-addon3"/>
                                                    </div>
                                                </fieldset>
                                            </div>

                                            {props.data.productId ? (
                                                <div className="d-flex justify-content-start ms-5 mb-1">
                                                    <fieldset disabled={true}>
                                                        <div className="ms-2 me-2">
                                                            <label htmlFor="pTitle"
                                                                   className="col-form-label ms-1">Назва
                                                                продукту</label>
                                                            <Field type="text"
                                                                   id="pTitle" value={props.data.productTitle}
                                                                   className={'form-control form-control-sm'}
                                                                   aria-describedby="basic-addon3"/>
                                                            <label htmlFor="pCount"
                                                                   className="col-form-label ms-1">Кількість</label>
                                                            <Field type="number"
                                                                   id="pCount" value={props.data.productCount}
                                                                   className={'form-control form-control-sm'}
                                                                   aria-describedby="basic-addon3"/>
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            ) : null}
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>

                        <Modal
                            id="handleTransfer"
                            label="handleTransferLabel">
                            <TransferHandle source={props.data}/>
                        </Modal>
                    </div>
                )}
        </div>
    );
};

export default Slot;