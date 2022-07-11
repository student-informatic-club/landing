import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from 'yup';
import { Formik, Form, Field } from "formik";
import Logo from "../components/layout/partials/Logo";
import Store from "../admin/store";
// import createNotification from "../components/elements/Nofication";
const SchemaLogin = Yup.object().shape({
    username: Yup.string().required("Vui lòng điền trường này"),
    password: Yup.string().required("Vui lòng điền trường này")
})
const Login = () => {
    let history = useHistory();
    const account = Store((state) => state.account);
    const rememberCheck = useRef(null);
    useEffect(() => {
        if(rememberCheck.current.checked === true){
            Store.setState({remember: true})
        }else {
            Store.setState({remember: false})
        }
    }, [])
    // const rememberStatus = Store((state) => state.remember);
    return (
        <div className="login-section">
            <div className="login-section-container">
                <div className="login-header">
                    <Logo/>
                    <h1>Login Admin</h1>
                </div>
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validationSchema={SchemaLogin}
                    onSubmit = {(values) => {
                        if(values.username === account.username && values.password === account.password){
                            // createNotification('success', 'Đăng Nhập Thành Công')
                            Store.setState({status: true});
                            sessionStorage.setItem('LoginStatus', true);
                            setTimeout(() => {
                                history.push('/admin');
                            }, 500);
                        }else {
                            // createNotification('error', 'Lỗi Đăng Nhập')
                        }
                    }}
                >
                    {({errors, touched}) => (
                        <Form className="form-login">
                            <div className="form-login-input">
                                <Field name="username" placeholder=" "/>
                                <label htmlFor="username" className="title">Username</label>
                                {errors.username && touched.username ? (<div className="errorMessage">{errors.username}</div>):(<div className="errorMessage"></div>)}
                            </div>
                            <div className="form-login-input">
                                <Field name="password" placeholder=" "/>
                                <label htmlFor="password" className="title">Password</label>
                                {errors.password && touched.password ? (<div className="errorMessage">{errors.password}</div>):(<div className="errorMessage"></div>)}
                            </div>
                            <div className="remember-checkbox">
                                <input type="checkbox" id="remember" ref={rememberCheck}/>
                                <label className="remember-label" for="remember">Remember Me</label>
                            </div>
                            <div>
                                <button type="submit" className="login-btn">Login</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Login