import React from 'react';
import PropTypes from 'prop-types';

interface IRoadmap {
  title: string;
  id: string;
  category: string;
  __typename: string;
}

interface RoadmapListProps {
  results: IRoadmap[];
  roadmaps?: IRoadmap[];
}

const RoadmapList: React.FC<RoadmapListProps> = ({ results, roadmaps }) => {
  if (results) {
    return (
      <div className="container">
        {results}
      </div>
    );
  }
  return (
    <div className="container">
      {roadmaps}
    </div>
  );
};

RoadmapList.propTypes = {
  results: PropTypes.arrayOf(PropTypes.any).isRequired,
  roadmaps: PropTypes.arrayOf(PropTypes.any).isRequired,
};


export default RoadmapList;
