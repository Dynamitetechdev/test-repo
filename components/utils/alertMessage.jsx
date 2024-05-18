"use client"
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AlertMessage = ({ message }) => {

    const emit = (message) => {
        toast(message) 
    }
    useEffect(() => {
        if (message) {
            emit(message)
        }
    }, [message])

    return ( 
        <ToastContainer position="top-right"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false} 
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        /> 
    );
}
 
export default AlertMessage;