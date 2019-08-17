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
  const [results, setResults] = useState([]);

  // fetching roadmaps from database
  const { data, loading } = useQuery(ALL_ROADMAPS);

  const renderSearchResults = () => {
    // regex for search functionality
    function escapeRegexCharacters(str: string) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    // escape whitespace characters
    const escapedValue = escapeRegexCharacters(query.trim());
    const regex = new RegExp(`^${escapedValue}`, 'i');
    // return search results if match is found
    const match = results && results.filter(
      (roadmap: IRoadmap) => regex.test(roadmap.title),
    );
    setResults(match);
  };

  // filter for clicked category only
  const renderCategories = (clickedCat: string) => {
    let match;
    // do query to database/cache here once implemented
    if (clickedCat === 'Popular') {
      match = data.roadmaps;
    } else {
      match = data.roadmaps && data.roadmaps.filter(
        (roadmap: IRoadmap) => roadmap.category === clickedCat,
      );
    }
    setResults(match);
  };

  // store clicked category in local state
  const handleClick = (clicked: string) => {
    renderCategories(clicked);
    setQuery('');
  };

  // change render componented depending on user input
  const handleChange = () => {
    renderSearchResults();
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
      <RoadmapList results={results} data={data.roadmaps} />
    </>
  );
};


export default Discover;
