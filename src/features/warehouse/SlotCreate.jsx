import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";

import {useCreateSlotMutation} from "./warehouseApiSlice";

import {Toast} from "../../components/Toast"

const SlotCreate = () => {

    const [createSlot] = useCreateSlotMutation();

    const initialValues = {
        size: 0,
        row: 0,
        tier: 0,
        box: 0
    }
    const onCreateSlot = async (values) => {
        const {data: id, error, invalidData} = await createSlot(values);

        if (id) {
            Toast("success", "Контейнер успішно створено")
        }
        if (!id) {
            Toast("error", "Такий контейнер вже існує")
        }
    }

    return (
        <div className="container">
            <Formik
                initialValues={initialValues}
                onSubmit={onCreateSlot}>
                {({errors, touched, isSubmitting}) => (
                    <Form>
                        <div className="d-flex">
                            <h3>{`Створити контейнер`}</h3>
                            <button type="submit" disabled={isSubmitting}
                                    className="btn btn-outline-success ms-3"
                                    data-bs-dismiss="modal">
                                <i className="bi bi-check-lg"></i>
                            </button>
                            <button type="reset"
                                    className="btn btn-outline-danger ms-2"
                                    data-bs-dismiss="modal">
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            <div className="ms-2 me-2">
                                <label htmlFor="size"
                                       className="form-label ms-1">Розмір</label>
                                <div className="input-group mb-2">
                                    <Field type="number"
                                           id="size" name="size"
                                           className={'form-control' + (errors.size && touched.size ? ' is-invalid' : '')}
                                           aria-describedby="basic-addon3"/>
                                    <ErrorMessage name="size" component="div"
                                                  className="invalid-feedback"/>
                                </div>
                            </div>
                            <div className="ms-2 me-2">
                                <label htmlFor="row"
                                       className="form-label ms-1">Ряд</label>
                                <div className="input-group mb-2">
                                    <Field type="number"
                                           id="row" name="row"
                                           className={'form-control' + (errors.row && touched.row ? ' is-invalid' : '')}
                                           aria-describedby="basic-addon3"/>
                                    <ErrorMessage name="row" component="div"
                                                  className="invalid-feedback"/>
                                </div>
                            </div>
                            <div className="ms-2 me-2">
                                <label htmlFor="tier"
                                       className="form-label ms-1">Ярус</label>
                                <div className="input-group mb-2">
                                    <Field type="number"
                                           id="tier" name="tier"
                                           className={'form-control' + (errors.tier && touched.tier ? ' is-invalid' : '')}
                                           aria-describedby="basic-addon3"/>
                                    <ErrorMessage name="tier" component="div"
                                                  className="invalid-feedback"/>
                                </div>
                            </div>
                            <div className="ms-2 me-2">
                                <label htmlFor="box"
                                       className="form-label ms-1">Контейнер</label>
                                <div className="input-group mb-2">
                                    <Field type="number"
                                           id="box" name="box"
                                           className={'form-control' + (errors.box && touched.box ? ' is-invalid' : '')}
                                           aria-describedby="basic-addon3"/>
                                    <ErrorMessage name="box" component="div"
                                                  className="invalid-feedback"/>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SlotCreate;