import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

import { loginUser } from '../store/authSlice'
import Logo from './Logo.jsx'
import Input from './Input.jsx'
import Button from './Button.jsx'


const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)

    const login = async (data) => {
        setError("")
        setLoading(true)
        try {

            await dispatch(loginUser(data))
            navigate("/")
        } catch (error) {
            setError("Invalid email or password")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex items-center justify-center w-full border border-dashed border-[#00bcff]'>
            <div className={`mx-auto w-full max-w-lg bg-transparent rounded-xl p-10 `}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold'>
                    Login to your account
                </h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to='/signup'
                        className='font-medium text-primary transition-all duration-200 hover:underline'
                    >
                        Sign Up
                    </Link>
                </p>
                {
                    error &&
                    <p className='text-red-500 font-bold mt-8 text-center'>
                        {error}
                    </p>
                }

                <form onSubmit={handleSubmit(login)}
                    className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label='Email: '
                            placeholder='Enter your email'
                            type='email'
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm.test(value) || setError("Please Enter a valid email")
                                }
                            })}
                        />
                        <Input
                            label='Password: '
                            placeholder='Enter your password'
                            type='password'
                            {...register('password', {
                                required: true
                            })}
                        />
                        <Button
                            bgColor='bg-primary'
                            type='submit'
                            className='w-full hover:bg-text hover:text-background bg-black text-white'
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login
