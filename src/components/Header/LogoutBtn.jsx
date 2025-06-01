

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'


import Button from '../Button.jsx';
import Confirm from '../../pages/Confirm.jsx';
import { logoutUser } from '../../store/authSlice.js';

const LogoutBtn = () => {
    const dispatch = useDispatch();


    const logoutHandler = async () => {
        await dispatch(logoutUser());
    }

    const [confirmationModal, setConfirmationModal] = useState(false);
    const handleButtonClick = () => setConfirmationModal(true);
    const handleCloseModal = () => setConfirmationModal(false);

    useEffect(() => {
        // console.log("Confirmation Modal visible: ", confirmationModal);
    }, [confirmationModal]);

    return (
        <>
            <Button
                onClick={handleButtonClick}
                className='inline-block sm:px-5 px-5 py-2 duration-200
                 hover:bg-blue-100 rounded-full'>
                Logout
            </Button>
            {
                confirmationModal ?
                    <Confirm
                        handleCloseModal={handleCloseModal}
                        confirmHandler={logoutHandler}
                        textContent={"You will be logged out."}
                        btnText={'Logout'} />
                    : null
            }
        </>

    )
}

export default LogoutBtn
