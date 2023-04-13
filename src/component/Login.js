import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth"
import app from '../firebase/firebase.init';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const auth = getAuth(app)

const Login = () => {
    const [success, setSuccess] = useState(false)
    const [userEmail, setUserEmail] = useState('')
    const handleLogin = (event) => {
        event.preventDefault()
        setSuccess(false)
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user)

                form.reset()
                setSuccess(true)
            })
            .catch(error => {
                console.error(error)
            })
    }

    // const resetEmail = (event) => {
    //     const email = event.target.value;
    //     setUserEmail(email)
    //     console.log(email);
    // }

    // const resetPassword = () => {
    //     if(!userEmail){
    //         Swal.fire({
    //             position: 'center',
    //             icon: 'error',
    //             title: 'wright your email',
    //             showConfirmButton: false,
    //             timer: 1500
    //           })
    //           return;
    //     }
    //     sendPasswordResetEmail(auth, userEmail)
    //         .then(() => {
    //             toast('send email pass')
    //         })
    //         .catch(error => {
    //             console.error(error)
    //         })
    // }

    return (
        <div className='w-25 mx-auto mt-5'>
            <h2>Login</h2>
            <Form onSubmit={handleLogin}>
                <Form.Group  className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control  type="email" name="email" placeholder="Enter email" required />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" required />
                </Form.Group>
                {/* <p className='text-danger'>{passwordError}</p> */}
                {success && <p className='text-success'>Login successfully</p>}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <ToastContainer />
            </Form>
            {/* <p>Forget password ?please <button onClick={resetPassword} type="button" className="btn btn-link">Reset</button></p> */}
            <p>Forget password ?please <Link to='/reset'>Reset Password</Link></p>
            <p>New to website please<Link to='/'>Register</Link></p>

        </div>
    );
};

export default Login;