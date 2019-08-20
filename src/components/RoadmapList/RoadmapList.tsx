import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const GET_ROADMAPS = gql`
query roadmaps($category: String, $title: String, $offset: Int, $limit: Int) {
  roadmaps (category: $category, title: $title, offset: $offset, limit: $limit) {
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

interface RoadmapListProps {
  searchInput: string;
  currCategory: string;
}

const RoadmapList: React.FC<RoadmapListProps> = ({ searchInput, currCategory }) => {
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

  const roadmaps = data && data.roadmaps.map((item: IRoadmap) => (
    <Link id="roadmaps" key={item.id} to={`/roadmap/${item.id}`}>
      {item.title}
    </Link>
  ));
  return (
    <div>
      <div className="container">
        {roadmaps}
      </div>
      <button type="button" onClick={handleNext}>Load More</button>
    </div>
  );
};

RoadmapList.propTypes = {
  searchInput: PropTypes.string.isRequired,
  currCategory: PropTypes.string.isRequired,
};


export default RoadmapList;
