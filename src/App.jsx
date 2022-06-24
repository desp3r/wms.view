import React, {useEffect, useState} from "react";
import {Routes, Route, useLocation, Redirect} from "react-router-dom";
import Auth from "./features/accounts/Auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./app/Home";
import ProductsList from "./features/products/ProductsList";
import Navbar from "./app/Navbar";
import Product from "./features/products/Product";
import ProductCreate from "./features/products/ProductCreate";
import Warehouse from "./features/warehouse/Warehouse";
import SuppliesList from "./features/supplies/SuppliesList";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import OrdersList from "./features/orders/OrdersList";
import Order from "./features/orders/Order";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "./features/accounts/authSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import {Role} from "./app/helpers/role"
import AccountsList from "./features/accounts/AccountsList";
import Account from "./features/accounts/Account";
import AccountCreate from "./features/accounts/AccountCreate";


const App = () => {
    const user = useSelector(selectCurrentUser)
    let jwt = user.jwtToken;

    return (
        <>
            {jwt && <Navbar user={user}/>}
            <ToastContainer/>
            <Routes>
                <Route path="/login" element={<Auth/>}/>

                <Route path="/" element={
                    <ProtectedRoute token={jwt} allowed={true}>
                        <Home user={user}/>
                    </ProtectedRoute>
                }/>

                <Route path="/products" element={
                    <ProtectedRoute token={jwt} allowed={true}>
                        <ProductsList user={user}/>
                    </ProtectedRoute>
                }/>

                <Route path="/products/view/:id" element={
                    <ProtectedRoute token={jwt} allowed={true}>
                        <Product user={user}/>
                    </ProtectedRoute>
                }/>

                <Route path="/products/update/:id" element={
                    <ProtectedRoute token={jwt} allowed={user.role === Role.Admin || user.role === Role.Manager}>
                        <Product user={user}/>
                    </ProtectedRoute>
                }/>

                <Route path="/products/create" element={
                    <ProtectedRoute token={jwt} allowed={user.role === Role.Admin || user.role === Role.Manager}>
                        <ProductCreate/>
                    </ProtectedRoute>
                }/>

                <Route path="/warehouse" element={
                    <ProtectedRoute token={jwt} allowed={true}>
                        <Warehouse user={user}/>
                    </ProtectedRoute>
                }/>

                <Route path="/supplies" element={
                    <ProtectedRoute token={jwt} allowed={true}>
                        <SuppliesList user={user}/>
                    </ProtectedRoute>
                }/>

                <Route path="/orders" element={
                    <ProtectedRoute token={jwt} allowed={true}>
                        <OrdersList/>
                    </ProtectedRoute>
                }/>

                <Route path="/orders/view/:id" element={
                    <ProtectedRoute token={jwt} allowed={true}>
                        <Order/>
                    </ProtectedRoute>
                }/>

                <Route path="/accounts" element={
                    <ProtectedRoute token={jwt} allowed={user.role === Role.Admin}>
                        <AccountsList user={user}/>
                    </ProtectedRoute>
                }/>

                <Route path="/accounts/view/:id" element={
                    <ProtectedRoute token={jwt} allowed={user.role === Role.Admin}>
                        <Account/>
                    </ProtectedRoute>
                }/>

                <Route path="/accounts/update/:id" element={
                    <ProtectedRoute token={jwt} allowed={user.role === Role.Admin}>
                        <Account/>
                    </ProtectedRoute>
                }/>

                <Route path="/accounts/create" element={
                    <ProtectedRoute token={jwt} allowed={user.role === Role.Admin}>
                        <AccountCreate/>
                    </ProtectedRoute>
                }/>
            </Routes>
        </>
    )
}

export default App;