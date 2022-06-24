import React from 'react';
import {Field, Form, Formik} from "formik";
import {useGetProductDetailsQuery} from "../products/productsApiSlice";
import Spinner from "../../app/Spinner";
import Modal from "../../components/Modal";
import SupplyHandle from "./SupplyHandle";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../accounts/authSlice";
import {Role} from "../../app/helpers/role";

const Supply = props => {
    const user = useSelector(selectCurrentUser)
    const {
        data: product,
        isLoading,
        isSuccess
    } = useGetProductDetailsQuery(props.data.productId);

    const onSubmit = () => {

    }

    return (
        <>
            {isLoading ? (<Spinner/>) : (
                <div>
                    <div className="container">
                        <Formik
                            initialValues={props.data}
                            onSubmit={onSubmit}>
                            {({errors, touched, isSubmitting, values}) => (
                                <Form>
                                    <div className="d-flex">
                                        <h3 className="ms-5 mt-2">{`Постачання ${props.data.title}`}</h3>
                                        <div className="ms-2 mt-2">

                                            {(user.role === Role.Admin || user.role === Role.Loader) &&
                                                <button disabled={values.supplyState === 2}
                                                        className="btn btn-outline-success ms-2"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#handleSupply"
                                                        type="button">
                                                    Обробка
                                                </button>
                                            }

                                        </div>
                                    </div>

                                    <div className="ms-5 mb-2">
                                        <fieldset disabled={true}>
                                            <div className="d-flex flex-row">
                                                <div className="ms-2 me-2">
                                                    <label htmlFor="prodTitle"
                                                           className="col-form-label">Назва продукту</label>
                                                    <Field type="text"
                                                           value={product.title}
                                                           id="prodTitle"
                                                           className={'form-control'}
                                                           aria-describedby="basic-addon3"/>
                                                </div>
                                                <div className="ms-2 me-2">
                                                    <label htmlFor="prodCategory"
                                                           className="col-form-label">Категорія продукту</label>
                                                    <Field type="text"
                                                           value={product.category}
                                                           id="prodCategory"
                                                           className={'form-control'}
                                                           aria-describedby="basic-addon3"/>
                                                </div>
                                                <div className="ms-2 me-2">
                                                    <label htmlFor="productCount"
                                                           className="col-form-label">Кількість</label>
                                                    <Field type="text"
                                                           id="productCount" name="productCount"
                                                           className={'form-control'}
                                                           aria-describedby="basic-addon3"/>
                                                </div>
                                                <div className="ms-2 me-2">
                                                    <label htmlFor="productLeft"
                                                           className="col-form-label">Залишилось розмістити</label>
                                                    <Field type="text"
                                                           id="productLeft" name="productLeft"
                                                           className={'form-control'}
                                                           aria-describedby="basic-addon3"/>
                                                </div>

                                            </div>
                                        </fieldset>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>

                    <Modal
                        id="handleSupply"
                        label="handleSupplyLabel">
                        <SupplyHandle product={product} supply={props}/>
                    </Modal>
                </div>
            )}
        </>
    );
};


export default Supply;