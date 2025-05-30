import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { registerUser } from '../store/authSlice.js';
import Logo from './Logo.jsx'
import Input from './Input.jsx'
import Button from './Button.jsx'

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");

    const signup = async (data) => {
        setError("");
        setLoading(true);
        try {
            await dispatch(registerUser(data));
            navigate('/login')
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex items-center justify-center w-full '>
            <div className={`mx-auto w-full max-w-lg bg-transparent rounded-xl p-10 border border-dashed border-[#00bcff]`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold'>
                    Sign up to create an account
                </h2>
                <p className='mt-2 text-center text-base  text-[#baabf2]'>
                    Already have an account?&nbsp;
                    <Link
                        to='/login'
                        className='font-medium text-primary transition-all duration-200 hover:underline'
                    >
                        Login
                    </Link>
                </p>
                {
                    error &&
                    <p className=' font-bold mt-8 text-center '>
                        {error}
                    </p>
                }
                <form onSubmit={handleSubmit(signup)}
                    className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label='Avatar: '
                            placeholder='upload your avatar'
                            accept='image/*'
                            type='file'
                            {...register('avatar', {
                                required: false
                            })}
                        />
                        <Input
                            label='Name: '
                            placeholder='Enter your name'
                            type='text'
                            {...register('name', {
                                required: true
                            })}
                        />
                        <Input
                            label='Email: '
                            placeholder='Enter your email'
                            type='email'
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm.test(value)
                                        || setError('Please enter a valid email')
                                }
                            })}
                        />
                        <Input
                            label='Password: '
                            placeholder='Enter your password'
                            type='password'
                            {...register('password', {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value)
                                        || setError('Password must have atleast one uppercase and number')
                                }
                            })}
                        />
                        <Button
                            bgColor='bg-primary'
                            type='submit'
                            className='w-full hover:bg-text hover:text-background  bg-black text-[#baabf2]'
                            disabled={loading}
                        >
                            {loading ? "Signing up..." : "Sign Up"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
