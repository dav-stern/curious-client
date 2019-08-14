import gql from 'graphql-tag';
import jwtDecode from 'jwt-decode';
import React, { useState } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import AuthForm from '../../components/AuthForm/AuthForm';

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    signup(email: $email, password: $password)
  }
`;

const Login: React.FC = () => {
  const client = useApolloClient();
  const [passwordInput, setPasswordInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [login] = useMutation(
    LOGIN,
    {
      variables: { email: emailInput, password: passwordInput },
      onCompleted(data) {
        localStorage.setItem('token', data.signup);
        if (data.signup) {
          const { id, name, email } = data.signup && jwtDecode(data.signup);
          client.writeData({ data: { id, name, email } });
        } else {
          // TODO: Send some warning to the user
          setErrorMsg('Email or password are wrong!');
        }
      },
    },
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
    // setPasswordInput('');
    // setEmailInput('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === 'email') {
      setEmailInput(value);
    } else if (name === 'password') {
      setPasswordInput(value);
    }
  };

  return (
    <AuthForm
      email={emailInput}
      password={passwordInput}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      errorMsg={errorMsg}
    />
  );
};

export default Login;
