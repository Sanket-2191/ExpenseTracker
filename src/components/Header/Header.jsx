import { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Link, useNavigate } from 'react-router-dom'

import { authSelector } from '../../store/authSlice.js'
import Container from '../container/Container.jsx'
import Button from '../Button.jsx'
import LogoutBtn from './LogoutBtn.jsx'
import Logo from '../Logo.jsx';

const Header = () => {
    const authState = useSelector(authSelector);
    const { user, loggedIn } = authState;

    const navigate = useNavigate();

    const navItems = [
        {
            name: "Login",
            route: "/login",
            active: !loggedIn,
        },
        {
            name: "Signup",
            route: "/signup",
            active: !loggedIn,
        },
        {
            name: "New",
            route: "/add-transaction",
            active: loggedIn,
        },
        {
            name: "History",
            route: "/transaction-history",
            active: loggedIn,
        },
        // {
        //     name: "Budget",
        //     route: "/create-budget",
        //     active: loggedIn,
        // },
        {
            name: "Analytics",
            route: "/analytics",
            active: loggedIn,
        }
    ]
    return (
        <>
            <header className="max-w-[100%] h-[12vh] mb-1 border border-dashed border-[#0099ff] flex justify-center items-center
             py-2 px-5 shadow-lg bg-background backdrop-blur-2xl sticky top-0 z-10">

                <nav className="w-[100%] flex flex-col justify-center items-center md:flex-row md:justify-between ">
                    <div className=" mx-5 w-[15*">
                        <Link>
                            <Logo width="100px" />
                        </Link>
                    </div>
                    <div
                        className=" flex items-center justify-between
                          overflow-auto">
                        <ul className="flex sm:space-x-7 space-x-3 md:mr-2">
                            {navItems.map((item) =>
                                item.active ? (
                                    <li key={item.name}>
                                        <NavLink
                                            to={item.route}
                                            className={({ isActive }) => ""}
                                        >
                                            {({ isActive }) => (
                                                <Button
                                                    className={` hover:bg-gray-600 text-nowrap
                                                          ${isActive ? "" : "bg-gray-500 text-amber-950"}`}
                                                >
                                                    {item.name}
                                                </Button>
                                            )}
                                        </NavLink>
                                    </li>
                                ) : null
                            )}
                            {loggedIn && (
                                <li className="list-none rounded-full text-text md:hover:bg-accent hover:text-background " key="logoutBtn">
                                    <LogoutBtn />
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>

            </header >


        </>
    )
}

export default Header
