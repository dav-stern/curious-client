import gql from 'graphql-tag';
import jwtDecode from 'jwt-decode';
import React, { useState } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import AuthForm from '../../components/AuthForm/AuthForm';

const SIGN_UP = gql`
  mutation signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password)
  }
`;

// interface token {
//   signup: string
// }

// interface dataSignup {
//   data: token
// }

const Signup: React.FC = () => {
  const client = useApolloClient();
  const [nameInput, setNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [signup] = useMutation(SIGN_UP, {
    variables: { name: nameInput, email: emailInput, password: passwordInput },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res: any = await signup();
    if (res.data.signup) {
      localStorage.setItem('token', res.data.signup);
      const { id, name, email } = jwtDecode(res.data.signup);
      client.writeData({ data: { id, name, email } });
      setNameInput('');
      setPasswordInput('');
      setEmailInput('');
    } else {
      setErrorMsg('This email already exists!');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    if (name === 'name') {
      setNameInput(value);
    } else if (name === 'email') {
      setEmailInput(value);
    } else if (name === 'password') {
      setPasswordInput(value);
    }
  };

  return (
    <AuthForm
      name={nameInput}
      email={emailInput}
      password={passwordInput}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      errorMsg={errorMsg}
    />
  );
};

export default Signup;
