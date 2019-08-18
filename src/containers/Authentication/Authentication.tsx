import React, { useState, useRef } from 'react';
import LoginComp from '../../components/LoginComp/LoginComp';
import SignUpComp from '../../components/SignUpComp/SignUpComp';

import './Authentication.css';

const Authentication: React.FC = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [tab, setTab] = useState('login');

  const [loginSelected, setLoginSelected] = useState('selected');

  const loginRef = useRef(null);
  const signUpRef = useRef(null);

  const handleTabToggle = (e: React.MouseEvent<HTMLElement>) => {
    if (tab === 'login' && e.target === signUpRef.current) {
      setLoginSelected('');
      setTab('signUp');
    } else if (tab === 'signUp' && e.target === loginRef.current) {
      setLoginSelected('selected');
      setTab('login');
    }
  };

  return (
    <div className="external__container">
      <div className="banner">
        <h1 className="us">CURIO.US</h1>
      </div>
      <div className="LISU__container">
        <div className="LISU__wrapper">
          <div className="form__header">
            <button type="button" ref={loginRef} onClick={handleTabToggle} className={`login__selector ${loginSelected === 'selected' ? 'selected' : ''}`}>
              <p>Login</p>
            </button>
            <button type="button" ref={signUpRef} onClick={handleTabToggle} className={`login__selector ${loginSelected === '' ? 'selected' : ''}`}>
              <p>Sign-Up</p>
            </button>
          </div>
          {
            (tab === 'login')
              ? <LoginComp errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
              : <SignUpComp errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
          }
        </div>
      </div>
    </div>
  );
};

export default Authentication;
