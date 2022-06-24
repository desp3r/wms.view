import React from 'react';
import {useTransferProductMutation, useGetForTransferQuery} from "./warehouseApiSlice";
import Spinner from "../../app/Spinner";
import {ErrorMessage, Field, Form, Formik} from "formik";
import SelectSearch from "../../components/SelectSearch";
import {Toast} from "../../components/Toast";

const TransferHandle = ({source}) => {

    const [transferProduct] = useTransferProductMutation();

    const searchParams = {
        productId: source.productId,
        sourceId: source.id
    }

    const {
        data: slots,
        isLoading,
        isError
    } = useGetForTransferQuery(searchParams);

    const initialValues = {
        source: source.id,
        destination: 0,
        productId: source.productId,
        productTitle: source.productTitle,
        productCount: 0
    }

    const onSubmit = async (values) => {
        const slot = slots.find(x => x.id === values.destination);

        if ((values.productCount > source.productCount) ||
            (values.productCount > slot.placeLeft) || values.productCount < 0) {
            Toast("error", "Ви ввели неправильну кількість продуктів.")
        } else {
            const {data: res, error, invalidData} = await transferProduct(values);

            if (res) {
                Toast("success", "Переміщення пройшло успішно")
            }
            if (error || invalidData) {
                Toast("success", "Помилка при мереміщенні")
            }
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
                                    <h3>{`Переміщення #${values.productId}`}</h3>

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
                                        <label htmlFor="destination"
                                               className="form-label ms-1">Перемістити в:</label>
                                        <Field id="destination" name="destination"
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

export default TransferHandle;