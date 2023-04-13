import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth"
import app from '../firebase/firebase.init';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';


const auth = getAuth(app);

const Register = () => {
    const [passwordError, setPasswordError] = useState('')
    const [success, setSuccess] = useState(false);
    const [user,setUser]=useState({})

    const handleSubmit = (event) => {
        event.preventDefault()
        setSuccess(false)
        const form = event.target;
        const name = form.name.value;
        const url=form.url.value;
        const email = form.email.value;
        const password = form.password.value;
        if (password.length < 8) {
            setPasswordError('password at east eight character')
            return;
        }
        if (!/^(?=.*[A-Z]).*[A-z].*$/.test(password)) {
            setPasswordError('should at least 2 upercase')
            return;
        }
        if (!/(?=.*[!@#$%^&*])/.test(password)) {
            setPasswordError('provide  speciel carecter')
            return
        }
        setPasswordError('')
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                setUser(user)

                form.reset()
                updateName(name,url)
                setSuccess(true)
                toast.success('wow')
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'User create successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                emailVerify()

            })
            .catch(error => {
                console.error(error)
                setPasswordError('already use')
            })
    }

    const emailVerify = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                toast('Verification email send')
            })
    }

    const updateName = (name,url) => {
        updateProfile(auth.currentUser, {
            displayName: name,
            photoURL:url
        })
            .then(() => {
                console.log('name updated')
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <div className='w-25 mx-auto mt-5'>
            <h2>Register</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Your name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter name" required />

                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Your Photo Url</Form.Label>
                    <Form.Control type="url" name="url" placeholder="Enter Photo url" required />

                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" required />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" required />
                </Form.Group>
                <p className='text-danger'>{passwordError}</p>
                {success && <p className='text-success'>user create successfully</p>}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <ToastContainer />
            </Form>
            <p>Already have an account please<Link to='/login'>Login</Link></p>
           {user.uid &&  <img src={user.photoURL} alt="" />   }
        </div>
    );
};

export default Register;