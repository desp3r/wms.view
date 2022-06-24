import React from 'react';
import {NavLink} from 'react-router-dom';
import {Role} from "./helpers/role";
import {useDispatch} from 'react-redux'
import {logOut} from '../features/accounts/authSlice'

const Navbar = ({user}) => {
    const dispatch = useDispatch()

    return (
        <nav className="navbar navbar-expand-lg bg-dark text-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false"
                        aria-label="Toggle navigation">
                </button>
                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                        <li className="nav-item">
                            <NavLink to="/" className="navbar-brand nav-item nav-link text-light">
                                <i className="bi bi-box-seam me-1"></i>
                                WMS
                            </NavLink>
                        </li>
                        {user.role === Role.Admin &&
                            <li className="nav-item">
                                <NavLink to="/accounts" className="nav-link text-light">Користувачі</NavLink>
                            </li>
                        }
                        <li className="nav-item">
                            <NavLink to="/products" className="nav-link text-light">Продукти</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/warehouse" className="nav-link text-light">Склад</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/supplies" className="nav-link text-light">Постачання</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/orders" className="nav-link text-light">Замовлення</NavLink>
                        </li>
                    </ul>
                    <NavLink to="/login" className="nav-link text-light bg-dark">
                        <button className="nav-item nav-link me-3 bg-dark outline-dark" onClick={() => dispatch(logOut(user))}>
                            <i className="bi bi-box-arrow-left bg-dark" style={{fontSize: "30px"}}></i>
                        </button>
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;