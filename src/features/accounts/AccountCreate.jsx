import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Role} from "../../app/helpers/role";

import {useCreateAccountMutation} from "./accountApiSlice"

import * as Yup from 'yup';
import {Toast} from "../../components/Toast";


const Account = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [createAccount] = useCreateAccountMutation();

    const initialValues = {
        firstName: "",
        lastName: "",
        role: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required("Обов'язкове поле"),
        lastName: Yup.string()
            .required("Обов'язкове поле"),
        email: Yup.string()
            .email('Невірний формат пошти')
            .required("Обов'язкове поле"),
        role: Yup.string()
            .required("Обов'язкове поле"),
        password: Yup.string()
            .concat(Yup.string().required("Обов'язкове поле"))
            .min(6, 'Довжина паролю щонайменш 6 символів'),
        confirmPassword: Yup.string()
            .when('password', (password, schema) => {
                if (password) return schema.required("Обов'язкове поле");
            })
            .oneOf([Yup.ref('password')], 'Паролі повинні співпадати')
    });


    const onSubmit = async (values, {setStatus, setSubmitting}) => {

        const {data: account, error, invalidData} = await createAccount(values);

        if (account) {
            Toast("success", "Обліковий запис успішно створено")
            navigate(`/accounts/view/${account.id}`)
        }
        if (!account) {
            setSubmitting(false);
            Toast("error", "Користувач з таким e-mail вже існує")
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
                onSubmit={onSubmit}
                onReset={() => onCancelBtnClick()}>
                {({errors, touched, isSubmitting}) => (
                    <Form>
                        <div className="d-flex">
                            <h3>{`Створити обліковий запис`}</h3>
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
                            <div className="form-group col-4">
                                <label htmlFor="firstName" className="form-label ms-1">Ім'я</label>
                                <div className="input-group mb-2">
                                    <Field type="text"
                                           id="firstName" name="firstName"
                                           className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')}
                                           aria-describedby="basic-addon3"/>
                                    <ErrorMessage name="firstName" component="div"
                                                  className="ms-1 invalid-feedback"/>
                                </div>
                                <label htmlFor="lastName" className="form-label ms-1">Прізвище</label>
                                <div className="input-group mb-2">
                                    <Field type="text"
                                           id="lastName" name="lastName"
                                           className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')}
                                           aria-describedby="basic-addon3"/>
                                    <ErrorMessage name="lastName" component="div"
                                                  className="ms-1 invalid-feedback"/>
                                </div>

                                <label htmlFor="role" className="form-label ms-1">Посада</label>
                                <div className="input-group mb-2">
                                    <Field type="text" as="select"
                                           id="role" name="role"
                                           className={'form-control' + (errors.role && touched.role ? ' is-invalid' : '')}
                                           aria-describedby="basic-addon3">
                                        <option value=""></option>
                                        <option value={Role.Admin}>Адміністратор</option>
                                        <option value={Role.Manager}>Менеджер</option>
                                        <option value={Role.Loader}>Вантажник</option>
                                    </Field>
                                    <ErrorMessage name="role" component="div" className="ms-1 invalid-feedback"/>
                                </div>

                                <label htmlFor="email" className="form-label ms-1">Пошта</label>
                                <div className="input-group mb-2">
                                    <Field type="text"
                                           id="email" name="email"
                                           className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                           aria-describedby="basic-addon3"/>
                                    <ErrorMessage name="email" component="div"
                                                  className="ms-1 invalid-feedback"/>
                                </div>
                                <label htmlFor="password" className="form-label ms-1">Пароль</label>
                                <div className="input-group mb-2">
                                    <Field type="password"
                                           id="password" name="password"
                                           className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}
                                           aria-describedby="basic-addon3"/>
                                    <ErrorMessage name="password" component="div"
                                                  className="ms-1 invalid-feedback"/>
                                </div>
                                <label htmlFor="confirmPassword" className="form-label ms-1">Підтвердити пароль</label>
                                <div className="input-group">
                                    <Field type="password"
                                           id="confirmPassword" name="confirmPassword"
                                           className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')}
                                           aria-describedby="basic-addon3"/>
                                    <ErrorMessage name="confirmPassword" component="div"
                                                  className="ms-1 invalid-feedback"/>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            < /Formik>
        </div>
    );
};

export default Account;