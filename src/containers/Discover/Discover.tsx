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


const ALL_ROADMAPS = gql`
query roadmaps($category: String) {
  roadmaps(category: $category) {
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
  const [results, setResults] = useState([]);
  const [currCategory, setCurrCategory] = useState('');

  // fetching roadmaps from database
  const { data, loading } = useQuery(ALL_ROADMAPS);


  // filter for clicked category only
  const renderCategories = (clickedCat: string) => {
    setCurrCategory(clickedCat);
    let match;
    if (clickedCat === 'Popular') {
      match = data.roadmaps;
    } else {
      match = data.roadmaps && data.roadmaps.filter(
        (roadmap: IRoadmap) => roadmap.category === clickedCat,
      );
    }
    setResults(match);
  };

  // when user types change roadmaps to matching regex
  const renderSearchResults = () => {
    let match;
    // regex for search functionality
    function escapeRegexCharacters(str: string) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    // escape whitespace characters
    const escapedValue = escapeRegexCharacters(searchInput.trim());
    const regex = new RegExp(`^${escapedValue}`, 'i');

    // return search results if match is found
    if (currCategory === 'Popular' || currCategory === '') {
      match = data.roadmaps && data.roadmaps.filter(
        (roadmap: IRoadmap) => regex.test(roadmap.title),
      );
    } else {
      match = data.roadmaps && data.roadmaps.filter(
        (roadmap: IRoadmap) => regex.test(roadmap.title) && roadmap.category === currCategory,
      );
    }
    // if no match show all roadmaps of this category
    if (data.roadmaps && !match.length) {
      renderCategories(currCategory);
    } else {
      // if match show matched roadmaps
      setResults(match);
    }
  };

  // on click render roadmaps of this category
  const handleClick = (clicked: string) => {
    renderCategories(clicked);
    setSearchInput('');
  };

  const handleChange = () => {
    renderSearchResults();
  };

  // render when user types in searchbar only
  useEffect(() => {
    handleChange();
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
      <RoadmapList results={results} data={data.roadmaps} />
    </>
  );
};


export default Discover;
