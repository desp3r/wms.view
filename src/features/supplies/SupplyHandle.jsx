import React, {useState} from 'react';
import Spinner from "../../app/Spinner";
import {ErrorMessage, Field, Form, Formik} from "formik";
import SelectSearch from "../../components/SelectSearch";
import {useGetFreeSlotsByProductQuery, useUpdateSlotMutation} from "../warehouse/warehouseApiSlice";
import {useUpdateSupplyMutation} from "./suppliesApiSlice";
import {Toast} from "../../components/Toast";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../accounts/authSlice";

const SupplyHandle = ({product, supply}) => {
    const user = useSelector(selectCurrentUser)
    const [updateSlot] = useUpdateSlotMutation();
    const [updateSupply] = useUpdateSupplyMutation();

    const {
        data: slots,
        isLoading,
        isSuccess
    } = useGetFreeSlotsByProductQuery(product.id);

    const initialValues = {
        id: 0,
        productId: product.id,
        productTitle: product.title,
        productCount: 0
    }

    const onSubmit = async (values) => {
        const slot = slots.find(x => x.id === values.id);

        if ((values.productCount > supply.data.productLeft) ||
            (values.productCount > slot.placeLeft) || values.productCount < 0) {
            Toast("error", "Ви ввели неправильну кількість продуктів.")
        } else {
            await onUpdateSlot(values);
            await onUpdateSupply(values);
        }

    }

    const onUpdateSlot = async (values) => {
        const {data: id, error, invalidData} = await updateSlot(values)

        if (id) {
            Toast("success", "Продукт було успішно розміщено")
        }
        if (error || invalidData) {
            Toast("success", "Помикла при розміщенні продукту")
        }
    }

    const onUpdateSupply = async (values) => {
        const updSupply = {
            id: supply.data.id,
            productLeft: supply.data.productLeft - values.productCount
        }

        const {data: id, error, invalidData} = await updateSupply(updSupply)

        if (id) {
            Toast("success", "Постачання успішно оновлено")
        }
        if (error || invalidData) {
            Toast("success", "Помилка при оновленні постачання")
        }
    }

    return (
        <>
            {isLoading ? (<Spinner/>) :
                (<div className="container">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values) => onSubmit(values)}>
                        {({errors, touched, isSubmitting, values}) => (
                            <Form>

                                <div className="d-flex">
                                    <h3>{`Розмістити продукт`}</h3>

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

                                <div className="d-flex mt-2">
                                    <div className="p-2 flex-grow-1">
                                        <label htmlFor="id"
                                               className="form-label ms-1">Контейнер</label>
                                        <Field id="id" name="id"
                                               component={SelectSearch}
                                               options={slots}/>
                                    </div>
                                    <div className="p-2 flex-shrink-1">
                                        <label htmlFor="productCount"
                                               className="form-label ms-1">Кількість</label>
                                        <Field type="number"
                                               disabled={values.id === 0} min="0"
                                               id="productCount" name="productCount"
                                               className={'form-control' + (errors.productCount && touched.productCount ? ' is-invalid' : '')}
                                               aria-describedby="basic-addon3"/>
                                        <ErrorMessage name="productCount" component="div"
                                                      className="invalid-feedback"/>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>)
            }
        </>
    );
};

export default SupplyHandle;