import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
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
      <section className="mask d-flex align-items-center">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="border-radius: 15px;">
                <div className="card-body p-5">
                  <h2 className="text-center mb-5">Login</h2>
                  <form onSubmit={handleFormSubmit}>
                    <div className="form-outline mb-4">
                      <label htmlFor="email">Email address:</label>
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
                    {error ? (
                      <div>
                        <p className="error-text">The provided credentials are incorrect</p>
                      </div>
                    ) : null}
                    <div className="d-flex justify-content-center">
                      <button className="button btn-outline-dark mt-auto" type="submit">Login</button>
                    </div>
                    <div className="d-flex justify-content-center">
                      <p className="text-center text-muted mt-5 mb-0">Don't have an account? <Link to="/signup">Signup here</Link></p>
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

export default Login;