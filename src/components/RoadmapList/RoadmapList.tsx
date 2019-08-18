import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

interface IRoadmap {
  title: string;
  id: string;
  category: string;
  __typename: string;
}

interface RoadmapListProps {
  results: IRoadmap[] | any;
  data: IRoadmap[];
}

const RoadmapList: React.FC<RoadmapListProps> = ({ results, data }) => {
  let roadmaps = results;
  if (!results.length) {
    roadmaps = data && data.map((item: IRoadmap) => (
      <Link id="roadmaps" key={item.id} to={`/roadmap/${item.id}`}>
        {item.title}
      </Link>
    ));
  } else {
    roadmaps = results && results.map((item: IRoadmap) => (
      <Link id="roadmaps" key={item.id} to={`/roadmap/${item.id}`}>
        {item.title}
      </Link>
    ));
  }
  return (
    <div className="container">
      {roadmaps}
    </div>
  );
};

RoadmapList.propTypes = {
  results: PropTypes.arrayOf(PropTypes.any),
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
};

RoadmapList.defaultProps = {
  results: [],
};


export default RoadmapList;
