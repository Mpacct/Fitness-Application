import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import '../assets/signup.css';

function Signup(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addUser({
            variables: {
                username: formState.username,
                email: formState.email,
                password: formState.password,
            },
        });
        const token = mutationResponse.data.addUser.token;
        Auth.login(token);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div>
            <section className="mask d-flex align-items-center" >
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="border-radius: 15px;">
                                <div className="card-body p-5">
                                    <h2 className="text-center mb-5">Create an account</h2>
                                    <form onSubmit={handleFormSubmit}>

                                        <div className="form-outline mb-4">
                                            <label htmlFor="username">Username:</label>
                                            <input
                                                placeholder="Username"
                                                name="username"
                                                type="username"
                                                id="username"
                                                className="form-control form-control-lg"
                                                onChange={handleChange}
                                            />                
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label htmlFor="email">Email:</label>
                                            <input
                                                placeholder="youremail@test.com"
                                                name="email"
                                                type="email"
                                                id="email"
                                                className="form-control form-control-lg"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label htmlFor="pwd">Password:</label>
                                            <input
                                                placeholder="******"
                                                name="password"
                                                type="password"
                                                id="pwd"
                                                className="form-control form-control-lg"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button className="button btn-outline-dark mt-auto" type="submit">Signup</button>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                        <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/login">Login here</Link></p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Signup;