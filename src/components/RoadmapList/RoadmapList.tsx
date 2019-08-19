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
  data: IRoadmap[];
}

const RoadmapList: React.FC<RoadmapListProps> = ({ data }) => {
  const roadmaps = data && data.map((item: IRoadmap) => (
    <Link id="roadmaps" key={item.id} to={`/roadmap/${item.id}`}>
      {item.title}
    </Link>
  ));
  return (
    <div className="container">
      {roadmaps}
    </div>
  );
};

RoadmapList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
};


export default RoadmapList;
