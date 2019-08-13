import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';


const SIGN_UP = gql`
  mutation signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password)
  }
`;


const SignUp: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [signup] = useMutation(SIGN_UP,
    {
      variables: { name: userName, email, password },
      onCompleted(data) {
        localStorage.setItem('token', data.signup);
      },
    });

  // handle submit
  const handleSubmit = (e:any) => {
    e.preventDefault();
    signup();
    setUserName('');
    setPassword('');
    setEmail('');
  };
  // handle change
  const handleChange = (e:any) => {
    const { target } = e;
    const { value, name } = target;

    if (name === 'name') {
      setUserName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={userName}
          required
        />
        <input
          type="text"
          name="email"
          onChange={handleChange}
          value={email}
          required
        />
        <input
          type="text"
          name="password"
          onChange={handleChange}
          value={password}
          required
        />
        <button type="submit">SIGN UP</button>
      </form>
    </div>
  );
};

export default SignUp;
