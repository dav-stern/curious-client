import React, { useState, useEffect } from 'react';
import './Discover.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import Navbar from '../../components/Navbar/Navbar';
import GET_ROADMAPS from './Discover.Queries';
import RoadmapList from '../../components/RoadmapList/RoadmapList';
import Linkbar from '../../components/CategoryBar/CategoryBar';
import categories from '../../categories';

const Discover: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [currCategory, setCurrCategory] = useState('');
  const [searchRes, setSearchRes] = useState({ roadmaps: [] });

  const client = useApolloClient();
  const {
    data,
    refetch,
    fetchMore,
  } = useQuery(GET_ROADMAPS);


  const renderSearchResults = async (s = '') => {
    setSearchInput(s);
    let res;
    if (currCategory === 'Popular' || currCategory === '') {
      res = await refetch({ title: s });
    } else {
      res = await refetch({ title: s, category: currCategory });
    }
    if (!res.data) return;
    const isResDistinct = (
      JSON.stringify(res.data.roadmaps) !== JSON.stringify(searchRes.roadmaps)
    );
    if (isResDistinct) { setSearchRes(res.data); }
  };
  // Souvenir !
  // const renderSearchResults = () => {
  //   if (currCategory === 'Popular' || currCategory === '') refetch({ title: searchInput });
  //   else refetch({ title: searchInput, category: currCategory });
  // };

  // filter for clicked category only
  const renderCategories = (clickedCat: string) => {
    if (clickedCat === 'Popular') refetch({ category: '' });
    else refetch({ category: clickedCat });

    renderSearchResults();
  };

  const handleNext = () => {
    fetchMore({
      variables: { offset: data.roadmaps.length },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        // if (fetchMoreResult.length < 20) setShowButton(false);
        setSearchRes({ ...prev, roadmaps: [...prev.roadmaps, ...fetchMoreResult.roadmaps] });
        // return { ...prev, roadmaps: [...prev.roadmaps, ...fetchMoreResult.roadmaps] };
      },
    });
  };

  // on click render roadmaps of this category
  useEffect(() => {
    renderCategories(currCategory);
  }, [currCategory]);

  // render when user types in searchbar only
  useEffect(() => {
    renderSearchResults();
  }, []);


  // on click set state of selected category
  const handleClick = (clicked: string) => {
    setCurrCategory(clicked);
  };

  const clientWriteSelectedRoadmapUID = (userId:any) => {
    client.writeData({
      data: {
        selectedRoadmapUID: userId,
      },
    });
  };

  return (
    <div>
      <Navbar />
      <div className="discover-container">
        <div className="search-container">
          <label className="search-label" htmlFor="search-input">
            <input
              type="text"
              id="search-input"
              placeholder="Search for..."
              onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => renderSearchResults(e.target.value)
              }
              value={searchInput}
              autoComplete="off"
            />
            <div id="icon-container">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </div>
          </label>
        </div>
        <Linkbar categories={categories} handleClick={handleClick} currCategory={currCategory} />
        <RoadmapList
          data={searchRes}
          handleNext={handleNext}
          clientWriteSelectedRoadmapUID={clientWriteSelectedRoadmapUID}
        />
      </div>
    </div>
  );
};

export default Discover;
