import gql from 'graphql-tag';
import jwtDecode from 'jwt-decode';
import React, { useState } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import AuthForm from '../../components/AuthForm/AuthForm';

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
    e.preventDefault();
    // TODO: any??
    const res: any = await login();
    localStorage.setItem('token', res.data.signup);
    if (res.data.signup) {
      const { id, name, email } = res.data.signup && jwtDecode(res.data.signup);
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

  return (
    <AuthForm
      inputs={inputs}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      errorMsg={errorMsg}
    />
  );
};

export default Login;
