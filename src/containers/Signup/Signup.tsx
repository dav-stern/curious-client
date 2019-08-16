import gql from 'graphql-tag';
import jwtDecode from 'jwt-decode';
import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import AuthForm from '../../components/AuthForm/AuthForm';

const SIGN_UP = gql`
  mutation signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password)
  }
`;

const Signup: React.FC = () => {
  const client = useApolloClient();
  const [inputs, setInputs] = useState({ name: '', email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [signup] = useMutation(SIGN_UP, {
    variables: { name: inputs.name, email: inputs.email, password: inputs.password },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // TODO: abstract the signup logic to a service
    e.preventDefault();
    // TODO: any??
    const res: any = await signup();
    if (res.data.signup) {
      localStorage.setItem('token', res.data.signup);
      const { id, name, email } = jwtDecode(res.data.signup);
      client.writeData({ data: { id, name, email } });
      setInputs({ name: '', email: '', password: '' });
    } else {
      setErrorMsg('This email already exists!');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  if (localStorage.getItem('token')) return <Redirect to="/dashboard" />;
  return (
    <div>
      <AuthForm
        inputs={inputs}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        errorMsg={errorMsg}
      />
      <Link to="/Login">Login</Link>
    </div>
  );
};

export default Signup;
