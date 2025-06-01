
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



import { authSelector } from '../store/authSlice.js'

const AuthLayout = ({ children }) => {
    const { loggedIn } = useSelector(authSelector);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        if (!loggedIn) {
            navigate('/');
        }

        setLoader(false);
    }, [navigate, loggedIn])
    return (
        <>
            {loader ? <h1> "Loading...." </h1> : children}
        </>
    )
}

export default AuthLayout;