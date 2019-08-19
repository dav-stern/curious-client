import React, { useState, useEffect } from 'react';
import './Discover.css';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../../components/Navbar/Navbar';
import Linkbar from '../../components/Linkbar/Linkbar';
import RoadmapList from '../../components/RoadmapList/RoadmapList';
import categories from '../../categories';


const GET_ROADMAPS_CATEGORY = gql`
query roadmaps($category: String, $title: String) {
  roadmaps(category: $category, title: $title) {
    id
    title
    category
  }
}
`;

interface IRoadmap {
  title: string;
  id: string;
  category: string;
  __typename: string;
}


const Discover: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [currCategory, setCurrCategory] = useState('');

  // fetching roadmaps from database
  const { data, loading, refetch } = useQuery(GET_ROADMAPS_CATEGORY);

  // filter for clicked category only
  const renderCategories = (clickedCat: string) => {
    setCurrCategory(clickedCat);
    if (clickedCat === 'Popular') {
      refetch({ category: '' });
    } else {
      refetch({ category: clickedCat });
    }
  };

  const renderSearchResults = () => {
    if (currCategory === 'Popular' || currCategory === '') {
      refetch({ title: searchInput });
    } else {
      refetch({ title: searchInput, category: currCategory });
    }
  };

  // on click render roadmaps of this category
  const handleClick = (clicked: string) => {
    renderCategories(clicked);
    setSearchInput('');
  };

  // render when user types in searchbar only
  useEffect(() => {
    renderSearchResults();
  }, [searchInput]);

  if (loading) return null;
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
      <RoadmapList data={data.roadmaps} />
    </>
  );
};


export default Discover;
