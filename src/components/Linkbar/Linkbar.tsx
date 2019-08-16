import React from 'react';
import './Linkbar.css';
import PropTypes from 'prop-types';

interface ICategory {
  name: string;
  iconPath: string;
}

interface LinkBarProps {
  categories: ICategory[]
}

const Linkbar: React.FC<LinkBarProps> = ({ categories }) => {
  const categoryJSX = categories.map((category: ICategory) => <a href="/"><div id="linkbar-category">{category.name}</div></a>);
  return (
    <div id="linkbar-container">
      {categoryJSX}
    </div>
  );
};

Linkbar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.any).isRequired,
};


export default Linkbar;
