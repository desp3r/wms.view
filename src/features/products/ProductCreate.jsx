import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";

import {useCreateProductMutation} from "./productsApiSlice"

import * as Yup from 'yup';
import {Toast} from "../../components/Toast";


const Product = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [createProduct] = useCreateProductMutation();

    const initialValues = {
        title: "",
        description: "",
        price: "",
        stock: 0,
        brand: "",
        category: ""
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required("Обов'язкове поле"),
        price: Yup.number()
            .required("Обов'язкове поле"),
        brand: Yup.string()
            .required("Обов'язкове поле"),
        category: Yup.string()
            .required("Обов'язкове поле"),
    });

    const onSubmit = async (values, actions) => {
        const {data: id, error, invalidData} = await createProduct(values);

        if (id) {
            Toast("success", "Продукт успішно створено")
            navigate(`/products/view/${id}`)
        }
        if (!id) {
            actions.resetForm();
            Toast("error", "Такий продукт вже існує")
        }
    }

    const onCancelBtnClick = () => {
        navigate(-1);
    }

    return (
        <div className="container mt-5 mb-5">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => onSubmit(values, actions)}
                onReset={() => onCancelBtnClick()}>
                {({errors, touched, isSubmitting}) => (
                    <Form>
                        <div className="d-flex">
                            <h3>{`Створити продукт`}</h3>
                            <button type="submit" disabled={isSubmitting}
                                    className="btn btn-outline-success ms-3">
                                <i className="bi bi-check-lg"></i>
                            </button>
                            <button type="reset"
                                    className="btn btn-outline-danger ms-2">
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>

                        <div className="form-row mt-3">
                            <div className="form-group col-5">

                                <label htmlFor="title" className="form-label ms-1">Назва</label>
                                <div className="input-group mb-2">
                                    <Field type="text"
                                           id="title" name="title"
                                           className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')}
                                           aria-describedby="basic-addon3"/>
                                    <ErrorMessage name="title" component="div"
                                                  className="invalid-feedback"/>
                                </div>

                                <label htmlFor="brand" className="form-label ms-1">Бренд</label>
                                <div className="input-group mb-2">
                                    <Field type="text"
                                           id="brand" name="brand"
                                           className={'form-control' + (errors.brand && touched.brand ? ' is-invalid' : '')}
                                           aria-describedby="basic-addon3"/>
                                    <ErrorMessage name="brand" component="div" className="invalid-feedback"/>
                                </div>

                                <label htmlFor="category" className="form-label ms-1">Категорія</label>
                                <div className="input-group mb-2">
                                    <Field type="text"
                                           id="category" name="category"
                                           className={'form-control' + (errors.category && touched.category ? ' is-invalid' : '')}
                                           aria-describedby="basic-addon3"/>
                                    <ErrorMessage name="category" component="div" className="invalid-feedback"/>
                                </div>

                                <div className="input-group mb-2 d-flex justify-content-evenly">
                                    <div>
                                        <label htmlFor="price" className="form-label ms-1">Ціна</label>
                                        <div className="input-group mb-2">
                                            <Field type="number"
                                                   id="price" name="price"
                                                   className={'form-control' + (errors.category && touched.category ? ' is-invalid' : '')}
                                                   aria-describedby="basic-addon3"/>
                                            <ErrorMessage name="price" component="div"
                                                          className="invalid-feedback"/>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="stock" className="form-label ms-1">На складі</label>
                                        <div className="input-group mb-2">
                                            <Field type="number" readOnly
                                                   id="stock" name="stock"
                                                   className={'form-control' + (errors.category && touched.category ? ' is-invalid' : '')}
                                                   aria-describedby="basic-addon3"/>
                                            <ErrorMessage name="stock" component="div"
                                                          className="invalid-feedback"/>
                                        </div>
                                    </div>
                                </div>

                                <label htmlFor="description" className="form-label ms-1">Опис</label>
                                <div className="input-group">
                                    <Field type="text" as="textarea" rows="5"
                                           id="description" name="description"
                                           className={'form-control' + (errors.category && touched.category ? ' is-invalid' : '')}
                                           aria-describedby="basic-addon3"/>
                                    <ErrorMessage name="description" component="div"
                                                  className="invalid-feedback"/>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            < /Formik>
        </div>
    );
};

export default Product;