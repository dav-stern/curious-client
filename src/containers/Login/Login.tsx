import gql from 'graphql-tag';
import jwtDecode from 'jwt-decode';
import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom'; //eslint-disable-line
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import AuthForm from '../../components/AuthForm/AuthForm';

import './Login.css';

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const Login: React.FC = () => {
  const client = useApolloClient();
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');

  const [login] = useMutation(LOGIN, {
    variables: { email: inputs.email, password: inputs.password },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // TODO: abstract the signup logic to a service
    e.preventDefault();
    // TODO: any??
    const res: any = await login();
    if (res.data.login) {
      localStorage.setItem('token', res.data.login);
      const { id, name, email } = res.data.login && jwtDecode(res.data.login);
      client.writeData({ data: { id, name, email } });
      setInputs({ email: '', password: '' });
    } else {
      setErrorMsg('Email or password are wrong!');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  if (localStorage.getItem('token')) return <Redirect to="/dashboard" />;
  return (
    <div className="external__container">
      <div className="banner">
        <h1 className="us">CURIO.US</h1>
      </div>
      <div className="LISU__container">
        <div className="LISU__wrapper">
          <div className="form__header">
            <div className="login__selector selected">
              <p>Login</p>
            </div>
            <div className="signup__selector">
              <p>Sign-Up</p>
            </div>

          </div>
          <AuthForm
            inputs={inputs}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            errorMsg={errorMsg}
          />
          {/* <Link to="/signup">Signup</Link> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
