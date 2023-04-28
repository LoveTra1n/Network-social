import React, {useEffect} from 'react';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import {Outlet} from 'react-router-dom'
import Aside from "../components/Aside/Aside";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {fillUser} from "../redux/reducers/user";
import {userSelector} from "../redux/reselect";

const Layout = () => {

    const dispatch = useDispatch()

    const {user} = useSelector(userSelector)


    useEffect(() => {
        axios(`http://localhost:4444/users/${user._id}`)
            .then((res) => dispatch(fillUser(res.data)))
    },[])


    return (
        <>
            <Header/>
            <div className="container">
                <div className="content">
                    <Aside/>
                    <Outlet/>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Layout;