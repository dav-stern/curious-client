import React, { useState } from 'react';
import './Discover.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../../components/Navbar/Navbar';
import RoadmapList from '../../components/RoadmapList/RoadmapList';
import Linkbar from '../../components/Linkbar/Linkbar';
import categories from '../../categories';


interface IRoadmap {
  title: string;
  id: string;
  category: string;
  __typename: string;
}


const Discover: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [currCategory, setCurrCategory] = useState('');

  // on click set state of selected category
  const handleClick = (clicked: string) => {
    setCurrCategory(clicked);
    setSearchInput('');
  };

  return (
    <>
      <Navbar />
      <Linkbar categories={categories} handleClick={handleClick} />
      <div className="search-container">
        <label className="search-label" htmlFor="search-input">
          <input
            type="text"
            id="search-input"
            placeholder="Search for..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
            value={searchInput}
            autoComplete="off"
          />
          <div id="icon-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </div>
        </label>
      </div>
      <RoadmapList searchInput={searchInput} currCategory={currCategory} />
    </>
  );
};


export default Discover;
