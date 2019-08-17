import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Discover.css';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../../components/Navbar/Navbar';
import Linkbar from '../../components/Linkbar/Linkbar';
import categories from '../../categories';


const ALL_ROADMAPS = gql`
query roadmaps {
  roadmaps {
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
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [results, setResults] = useState([]);

  // fetching roadmaps from database
  const { data, loading } = useQuery(ALL_ROADMAPS);
  // store search results temporarily
  let searchResults: any;

  const renderSearchResults = () => {
    // regex for search functionality
    function escapeRegexCharacters(str: string) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    // escape whitespace characters
    const escapedValue = escapeRegexCharacters(query.trim());
    const regex = new RegExp(`^${escapedValue}`, 'i');
    // return search results if match is found
    const match = data.roadmaps && data.roadmaps.filter(
      (roadmap: IRoadmap) => roadmap.category === category && regex.test(roadmap.title),
    );
    if (match) {
      searchResults = match.map(
        (item: IRoadmap) => <Link id="roadmaps" key={item.id} to={`/roadmap/${item.id}`}>{item.title}</Link>,
      );
    }
  };

  // filter for clicked category only
  const renderCategories = (clickedCat: string) => {
    const match = data.roadmaps && data.roadmaps.filter(
      (roadmap: IRoadmap) => roadmap.category === clickedCat,
    );
    searchResults = match.map(
      (item: IRoadmap) => <Link id="roadmaps" key={item.id} to={`/roadmap/${item.id}`}>{item.title}</Link>,
    );
    setResults(searchResults);
  };

  // store clicked category in local state
  const handleClick = (clicked: string) => {
    setCategory(clicked);
    renderCategories(clicked);
    setQuery('');
  };

  // change render componented depending on user input
  const handleChange = () => {
    renderSearchResults();
    setResults(searchResults);
  };

  // render when query is updated only
  useEffect(() => {
    handleChange();
  }, [query]);

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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            value={query}
            autoComplete="off"
          />
          <div id="icon-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </div>
        </label>
      </div>
      <div className="results-container">
        {results}
      </div>
    </>
  );
};


export default Discover;
