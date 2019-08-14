import React from 'react';
import PropTypes from 'prop-types';

interface AuthFormProps {
  name?: string,
  email: string,
  password: string,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  errorMsg: string,
}

const AuthForm: React.SFC<AuthFormProps> = ({
  name,
  email,
  password,
  handleSubmit,
  handleChange,
  errorMsg,
}) => (
  <div>
    <form
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={name}
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
    <div><p>{errorMsg}</p></div>
  </div>
);

AuthForm.defaultProps = {
  name: undefined,
};

AuthForm.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  errorMsg: PropTypes.string.isRequired,
};

export default AuthForm;
