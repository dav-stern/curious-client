/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import './RoadmapList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IUser } from '../../types/interfaces'; // eslint-disable-line no-unused-vars
import categoryLib from './categoryLib';

interface IRoadmap {
  id: string;
  title: string;
  category: string;
  UserId: string;
  user: IUser;
}

interface RoadmapListProps {
  data:any;
  handleNext():any;
  clientWriteSelectedRoadmapUID:any;
}

const RoadmapList: React.FC<RoadmapListProps> = ({
  data, handleNext, clientWriteSelectedRoadmapUID,
}) => {
  const [showButton, setShowButton] = useState(true);
  // fetching roadmaps from database


  if (!data) return null;
  if (data.roadmaps.length < 20 && showButton) setShowButton(false);

  const roadmaps = data && data.roadmaps.map((item: IRoadmap) => (
    <Link
      className="roadmap-container fade-in"
      id="roadmaps"
      key={item.id}
      to={`/preview/${item.id}`}
      onClick={() => clientWriteSelectedRoadmapUID(item.UserId)}
    >
      <div id="middle">
        <FontAwesomeIcon icon={categoryLib[item.category]} className="category-icon" />
        <div id="discover-title">{item.title}</div>
        <div id="discover-user"><p>{item.user.name}</p></div>
      </div>
    </Link>
  ));

  return (
    <div>
      <div className="discover-list-container">
        {roadmaps}
      </div>
      <div id="load-more-button">
        {data.roadmaps.length === 20 && <button type="button" onClick={handleNext}>Load More</button>}
      </div>
    </div>
  );
};

// RoadmapList.propTypes = {
//   data: PropTypes.object.isRequired,
// };

export default RoadmapList;
