
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { authSelector } from '../store/authSlice.js';
import Button from '../components/Button.jsx';
import Container from '../components/container/Container.jsx';

const Home = () => {

    const { loggedIn } = useSelector(authSelector);
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            navigate("/add-transaction")
        }
    }, [])

    return (
        <div className='max-w-full py-8 mt-4 text-center'>
            <Container>
                <div className='min-h-[50vh] flex flex-wrap'>
                    <div className='p-2 w-full'>
                        <h1 className='text-2xl font-bold mb-4 font-mono text-wrap'>
                            SignUp / Login to  experience the best way to manage your expenses and analyze your spending habits.
                            Our platform offers a user-friendly interface, powerful analytics, and seamless integration with your financial accounts.
                            Take control of your finances today and start your journey towards financial freedom!
                        </h1>
                        <div className='flex flex-col gap-6'>
                            <Link to='/signup'>
                                <Button bgColor='bg-black'>
                                    Signup
                                </Button>
                            </Link>
                            <Link to='/login'>
                                <Button bgColor='bg-black'>
                                    Login
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Home
