import React from 'react';
import PropTypes from 'prop-types';

interface inputsType {
  name?: string,
  email: string,
  password: string,
  [key: string]: string | undefined,
}

interface AuthFormProps {
  inputs: inputsType,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  errorMsg: string,
}

const AuthForm: React.SFC<AuthFormProps> = ({
  inputs,
  handleSubmit,
  handleChange,
  errorMsg,
}) => {
  const inputsJSX = Object.keys(inputs).map((key: string) => (
    <input type="text" name={key} key={key} onChange={handleChange} value={inputs[key]} required />
  ));

  return (
    <div>
      <form
        onSubmit={handleSubmit}
      >
        {inputsJSX}
        <button type="submit">{inputsJSX.length > 2 ? 'SIGN UP' : 'LOGIN'}</button>
      </form>
      <div><p>{errorMsg}</p></div>
    </div>
  );
};

AuthForm.propTypes = {
  inputs: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  errorMsg: PropTypes.string.isRequired,
};

export default AuthForm;
