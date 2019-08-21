import React, { useEffect, useState } from 'react';
import './RoadmapList.css';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useApolloClient, useQuery } from '@apollo/react-hooks';

const GET_ROADMAPS = gql`
query roadmaps($category: String, $title: String, $offset: Int, $limit: Int) {
  roadmaps (category: $category, title: $title, offset: $offset, limit: $limit) {
    id
    title
    category
    UserId
  }
}
`;

interface IRoadmap {
  title: string;
  id: string;
  category: string;
  UserId: string;
  __typename: string;
}

interface RoadmapListProps {
  searchInput: string;
  currCategory: string;
}

const RoadmapList: React.FC<RoadmapListProps> = ({ searchInput, currCategory }) => {
  const client = useApolloClient();
  const [showButton, setShowButton] = useState(true);
  // fetching roadmaps from database

  const {
    data,
    loading,
    refetch,
    fetchMore,
  } = useQuery(GET_ROADMAPS);

  // filter for clicked category only
  const renderCategories = (clickedCat: string) => {
    // setCurrCategory(clickedCat);
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

  const handleNext = () => {
    fetchMore({
      variables: { offset: data.roadmaps.length },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        if (fetchMoreResult.length < 20) setShowButton(false);
        return { ...prev, roadmaps: [...prev.roadmaps, ...fetchMoreResult.roadmaps] };
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
  }, [searchInput]);

  if (loading) return null;
  if (data.roadmaps.length < 20 && showButton) setShowButton(false);
  const roadmaps = data && data.roadmaps.map((item: IRoadmap) => (
    <Link
      className="roadmap-container"
      id="roadmaps"
      key={item.id}
      to={`/preview/${item.id}`}
      onClick={() => client.writeData({
        data: {
          selectedRoadmapUID: item.UserId,
        },
      })}
    >
      {item.title}
    </Link>
  ));
  return (
    <div>
      <div className="discover-list-container">
        {roadmaps}
      </div>
      {data.roadmaps.length === 20 && <button type="button" onClick={handleNext}>Load More</button>}
    </div>
  );
};

RoadmapList.propTypes = {
  searchInput: PropTypes.string.isRequired,
  currCategory: PropTypes.string.isRequired,
};


export default RoadmapList;
