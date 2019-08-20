import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useApolloClient, useQuery } from '@apollo/react-hooks';


const GET_ROADMAPS_CATEGORY = gql`
query roadmaps($category: String, $title: String) {
  roadmaps(category: $category, title: $title) {
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
  __typename: string;
}

interface RoadmapListProps {
  searchInput: string;
  currCategory: string;
}

const RoadmapList: React.FC<RoadmapListProps> = ({ searchInput, currCategory }) => {
  const client = useApolloClient();
  // fetching roadmaps from database
  const { data, loading, refetch } = useQuery(GET_ROADMAPS_CATEGORY);
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
    <Link
      id="roadmaps"
      key={item.id}
      to={`/preview/${item.id}`}
      onClick={() => client.writeData({
        data: {
          selectedRoadmapUID: data.roadmaps[+(item.id) - 1].UserId,
        },
      })}
    >
      {item.title}
    </Link>
  ));
  return (
    <>
      <div className="container">
        {roadmaps}
      </div>
    </>
  );
};

RoadmapList.propTypes = {
  searchInput: PropTypes.string.isRequired,
  currCategory: PropTypes.string.isRequired,
};


export default RoadmapList;
