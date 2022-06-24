import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup';

import {Formik, Field, Form, ErrorMessage} from 'formik';
import Button from "react-bootstrap/Button";
import {Toast} from "../../components/Toast"

import {useDispatch} from 'react-redux'
import {setCredentials} from './authSlice'
import {useLoginMutation} from './authApiSlice'

const Login = () => {
    const [login] = useLoginMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: ""
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
                const {data, error, invalidData} = await login(values)

                if (data) {
                    dispatch(setCredentials({data}))
                    navigate("/");
                }
                if (error || invalidData) {
                    Toast("error", "Невірний логін або пароль")
                }

            }}>
            {({errors, touched, isSubmitting}) => (
                <div className="container">
                    <div className="row">
                        <div className="col-sm-10 offset-sm-3 mt-5">
                            <div className="card m-3 mt-5 w-50">
                                <Form>
                                    <h3 className="card-header text-center">Авторизація</h3>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <div className="mb-3">
                                                <label>Email</label>
                                                <Field name="email" type="text"
                                                       className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}/>
                                                <ErrorMessage name="email" component="div"
                                                              className="invalid-feedback"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <Field name="password" type="password"
                                                   className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}/>
                                            <ErrorMessage name="password" component="div"
                                                          className="invalid-feedback"/>
                                        </div>
                                        <div className="form-row">
                                            <div className="mt-2 d-flex justify-content-center">
                                                <Button className="w-25" type="submit" disabled={isSubmitting}>
                                                    {isSubmitting &&
                                                        <span
                                                            className="spinner-border spinner-border-sm mr-5"></span>}
                                                    Вхід
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    )
}
export default Login