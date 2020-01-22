import React from 'react';
import './CategoryBar.css';
import PropTypes from 'prop-types';
import { ICategory } from '../../types/interfaces'; // eslint-disable-line no-unused-vars

interface LinkBarProps {
  categories: ICategory[]
  handleClick: (clicked: string) => void,
  currCategory:string,
}

const Linkbar: React.FC<LinkBarProps> = ({ categories, handleClick, currCategory }) => {
  const categoryJSX = categories.map(
    (category: ICategory) => {
      let currentClass = '';
      if (category.name === currCategory) currentClass = 'current';
      return (<button className={currentClass} type="button" onClick={() => handleClick(category.name)} key={category.id} id="linkbar-category">{category.name}</button>);
    },
  );
  let currentClass = '';
  if (currCategory === 'Popular' || !currCategory) currentClass = 'current';
  return (
    <>
      <div id="linkbar-container">

        <button className={currentClass} type="button" onClick={() => handleClick('Popular')} id="linkbar-category">Popular</button>
        {categoryJSX}
      </div>
    </>
  );
};

Linkbar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Linkbar;
