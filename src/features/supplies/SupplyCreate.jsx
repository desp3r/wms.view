import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";

import {useCreateSupplyMutation} from "./suppliesApiSlice";
import {useGetProductsQuery} from "../products/productsApiSlice";
import SelectSearch from "../../components/SelectSearch";
import Spinner from "../../app/Spinner";
import {Toast} from "../../components/Toast";

const SupplyCreate = () => {

    const {
        data: products,
        isLoading,
        isSuccess
    } = useGetProductsQuery();

    const [createSupply] = useCreateSupplyMutation();


    const initialValues = {
        productId: 0,
        productCount: 0
    }
    const onCreate = async (values, actions) => {

        if (values.productCount < 0 || values.productCount === 0) {
            Toast("error", "Невірно обрана кількість продукції")
            actions.setFieldValue("productCount", 0)
        } else {
            const {data: id, error, invalidData} = await createSupply(values);
            Toast("success", "Продукт успішно замовлено")
        }
    }

    return (
        <>
            {isLoading ? (<Spinner/>) :
                (<div className="container">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values, actions) => onCreate(values, actions)}>
                        {({errors, touched, isSubmitting}) => (
                            <Form>

                                <div className="d-flex">
                                    <h3>{`Замовити продукт`}</h3>

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
                                        <label htmlFor="productId"
                                               className="form-label ms-1">Продукт</label>
                                        <Field id="productId" name="productId"
                                               component={SelectSearch}
                                               options={products}/>
                                    </div>
                                    <div className="p-2 flex-shrink-1">
                                        <label htmlFor="productCount"
                                               className="form-label ms-1">Кількість</label>
                                        <Field type="number"
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

export default SupplyCreate;