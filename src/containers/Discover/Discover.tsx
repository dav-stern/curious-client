import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Discover.css';
import gql from 'graphql-tag';
import jwtDecode from 'jwt-decode';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../../components/Navbar/Navbar';
import Linkbar from '../../components/Linkbar/Linkbar';
import categories from '../../categories';

const GET_ROADMAPS = gql`
query getRoadmap($id: ID!) {
  roadmaps(id: $id) {
    id
    title
    category
    topics {
      id
      title
      description
      resources
      completed
      checklist {
        id
        title
        completed
      }
    }
  }
}
`;

const GET_LOCAL_ROADMAPS = gql`
{
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
  const client = useApolloClient();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // REMOVE ONCE QUERY IS WORKING
  const token: any = localStorage.getItem('token');
  const { id } = jwtDecode(token);

  // fetching roadmaps from database
  const { data, loading } = useQuery(GET_ROADMAPS, {
    variables: { id },
  });

  // store roadmaps in cache and render them on dashboard
  client.writeData({ data: { roadmaps: data.roadmaps } });
  const roadmapsCache = client.readQuery({ query: GET_LOCAL_ROADMAPS });

  let renderSearchResults;
  const handleChange = () => {
    const { roadmaps } = roadmapsCache;
    const match = roadmaps.filter((roadmap: IRoadmap) => roadmap.title === query);
    if (match) {
      renderSearchResults = match.map((item: IRoadmap) => <Link id="roadmaps" key={item.id} to={`/roadmap/${item.id}`}>{item.title}</Link>);
      setResults(renderSearchResults);
    }
  };

  useEffect(() => {
    handleChange();
  }, [query]);

  if (!loading) {
    return (
      <>
        <Navbar />
        <Linkbar categories={categories} />
        <div className="search-container">
          <label className="search-label" htmlFor="search-input">
            <input
              type="text"
              id="search-input"
              placeholder="Search for..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              value={query}
            />
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </label>
          {results}
        </div>
      </>
    );
  }
  return (null);
};


export default Discover;
