import React from 'react';
import './RoadmapItem.css';
import PropTypes from 'prop-types';

interface RoadmapItemProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  title: string,
}

const RoadmapItem: React.FC<RoadmapItemProps> = ({ handleChange, title }) => (
  <form id="roadmap-form">
    <input
      type="text"
      name="name"
      onChange={handleChange}
      value={title}
    />
    <button type="submit"> ADD ROADMAP</button>
  </form>
);

RoadmapItem.propTypes = {
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default RoadmapItem;
