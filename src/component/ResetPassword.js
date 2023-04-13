import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from '../firebase/firebase.init';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const auth = getAuth(app)

const ResetPassword = () => {
    const [error, setError] = useState(false)
    const [userEmail, setUserEmail] = useState('')

    const handleEmail = (event) => {
        const form = event.target;
        const email = form.value;
       
        setUserEmail(email)

    }

    const handleSubmit = () => {
        setError(false)
        if(!userEmail){
            Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'wright your email',
                            showConfirmButton: false,
                            timer: 1500
                          })
                          return;
        }
        sendPasswordResetEmail(auth, userEmail)
            .then(() => {
                toast('email send')
                setUserEmail()
            })
            .catch(error => {
                console.error(error)
                setError(true)
            })
    }
    return (
        <div className='w-25 mx-auto'>
            <h2>Password reset</h2>
            <Form.Group onBlur={handleEmail} className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" required />

            </Form.Group>
            {error && <p>email not use</p>}
            <Button onClick={handleSubmit} variant="primary" type="submit">
                Submit
            </Button>
            <ToastContainer />
        </div>
    );
};

export default ResetPassword;