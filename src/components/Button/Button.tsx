import React from 'react';
import PropTypes from 'prop-types';

interface ButtonProps {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => any,
  value: string,
}

const Button: React.FC<ButtonProps> = ({ handleClick, value }) => <button type="button" onClick={(handleClick)}>{value}</button>;


Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Button;
