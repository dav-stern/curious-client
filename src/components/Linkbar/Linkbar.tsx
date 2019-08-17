import React from 'react';
import './Linkbar.css';
import PropTypes from 'prop-types';

interface ICategory {
  id: number;
  name: string;
  iconPath: string;
}

interface LinkBarProps {
  categories: ICategory[]
  handleClick: (clicked: string) => void,
}

const Linkbar: React.FC<LinkBarProps> = ({ categories, handleClick }) => {
  const categoryJSX = categories.map(
    (category: ICategory) => <button type="button" onClick={() => handleClick(category.name)} key={category.id} id="linkbar-category">{category.name}</button>,
  );
  return (
    <div id="linkbar-container">
      {categoryJSX}
    </div>
  );
};

Linkbar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleClick: PropTypes.func.isRequired,
};


export default Linkbar;
