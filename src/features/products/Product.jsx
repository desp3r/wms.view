import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";

import {useGetProductDetailsQuery, useUpdateProductMutation, useDeleteProductMutation} from "./productsApiSlice"

import * as Yup from 'yup';
import Spinner from "../../app/Spinner";
import PageMode from "../../app/helpers/pageMode";
import FromSlotsSelection from "../orders/FromSlotsSelection";
import {Role} from "../../app/helpers/role";
import {Toast} from "../../components/Toast";


const Product = ({user}) => {
    const params = useParams();
    const navigate = useNavigate();
    const mode = PageMode(params["*"]);

    const {
        data: product,
        isLoading,
        isSuccess
    } = useGetProductDetailsQuery(params.id);

    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

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
        if (mode === "VIEW_MODE") {
            await onDeleteBtnClick();
        } else {
            const {data: id, error, invalidData} = await updateProduct(values);
            if (id) {
                navigate(`/products/view/${id}`)
            }
        }
    }

    const onUpdateBtnClick = () => {
        navigate(`/products/update/:${product.id}`)
    }

    const onDeleteBtnClick = async () => {
        if (product.stock > 0) {
            Toast("error", "Видалення неможливе. Продукт зберігається на складі.")
        }
        const {data: result, error, invalidData} = await deleteProduct(product.id);
        if (result) {
            navigate(`/products`)
        }
    }

    const onCancelBtnClick = () => {
        navigate(-1);
    }

    return (
        <div className="container mt-5 mb-5">
            {!product ?
                (
                    <Spinner/>
                ) :
                (
                    <Formik
                        initialValues={product}
                        validationSchema={validationSchema}
                        onSubmit={(values, actions) => onSubmit(values, actions)}
                        onReset={() => onCancelBtnClick()}>
                        {({errors, touched, isSubmitting, values}) => (
                            <Form>
                                <div className="d-flex flex-row">
                                    <div style={{width: "400px"}}>
                                        {mode === "VIEW_MODE" &&
                                            <div className="d-flex">
                                                <div className="d-flex">
                                                    <h2>{values.title}</h2>
                                                    {(user.role === Role.Manager || user.role === Role.Admin) &&
                                                        <div>
                                                            <button className="btn btn-outline-info ms-3"
                                                                    onClick={onUpdateBtnClick}>
                                                                <i className="bi bi-pencil"></i>
                                                            </button>
                                                            <button type="submit" disabled={isSubmitting}
                                                                    className="btn btn-outline-danger ms-2">
                                                                <i className="bi bi-trash"></i>
                                                            </button>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        }

                                        {mode === "UPDATE_MODE" &&
                                            <div className="d-flex">
                                                <h2>{`Редагування #${product.id}`}</h2>
                                                <button type="submit" disabled={isSubmitting}
                                                        className="btn btn-outline-success ms-3">
                                                    <i className="bi bi-check-lg"></i>
                                                </button>
                                                <button type="reset"
                                                        className="btn btn-outline-danger ms-2">
                                                    <i className="bi bi-x-lg"></i>
                                                </button>
                                            </div>
                                        }

                                        <div className="form-row mt-3">
                                            <div className="form-group">

                                                {mode === "UPDATE_MODE" &&
                                                    <>
                                                        <label htmlFor="title" className="form-label ms-1">Назва</label>
                                                        <div className="input-group mb-2">
                                                            <Field type="text"
                                                                   id="title" name="title"
                                                                   className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')}
                                                                   aria-describedby="basic-addon3"/>
                                                            <ErrorMessage name="title" component="div"
                                                                          className="invalid-feedback"/>
                                                        </div>
                                                    </>
                                                }

                                                <fieldset disabled={mode === "VIEW_MODE"}>
                                                    <label htmlFor="brand" className="form-label ms-1">Бренд</label>
                                                    <div className="input-group mb-2">
                                                        <Field type="text"
                                                               id="brand" name="brand"
                                                               className={'form-control' + (errors.brand && touched.brand ? ' is-invalid' : '')}
                                                               aria-describedby="basic-addon3"/>
                                                        <ErrorMessage name="brand" component="div"
                                                                      className="invalid-feedback"/>
                                                    </div>

                                                    <label htmlFor="category"
                                                           className="form-label ms-1">Категорія</label>
                                                    <div className="input-group mb-2">
                                                        <Field type="text"
                                                               id="category" name="category"
                                                               className={'form-control' + (errors.category && touched.category ? ' is-invalid' : '')}
                                                               aria-describedby="basic-addon3"/>
                                                        <ErrorMessage name="category" component="div"
                                                                      className="invalid-feedback"/>
                                                    </div>

                                                    <div className="input-group mb-2 d-flex justify-content-evenly">
                                                        <div className="w-25">
                                                            <label htmlFor="price"
                                                                   className="form-label ms-1">Ціна</label>
                                                            <div className="input-group mb-2">
                                                                <Field type="number"
                                                                       id="price" name="price"
                                                                       className={'form-control' + (errors.price && touched.price ? ' is-invalid' : '')}
                                                                       aria-describedby="basic-addon3"/>
                                                                <ErrorMessage name="price" component="div"
                                                                              className="invalid-feedback"/>
                                                            </div>
                                                        </div>
                                                        <div className="w-25">
                                                            <label htmlFor="stock"
                                                                   className="form-label ms-1">На складі</label>
                                                            <div className="input-group mb-2">
                                                                <Field type="number" readOnly
                                                                       id="stock" name="stock"
                                                                       className={'form-control'}
                                                                       aria-describedby="basic-addon3"/>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <label htmlFor="description"
                                                           className="form-label ms-1">Опис</label>
                                                    <div className="input-group">
                                                        <Field type="text" as="textarea" rows="5"
                                                               id="description" name="description"
                                                               className={'form-control'}
                                                               aria-describedby="basic-addon3"/>
                                                    </div>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    < /Formik>
                )}
        </div>
    );
};

export default Product;