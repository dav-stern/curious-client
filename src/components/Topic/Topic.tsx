import React from 'react';
import './Topic.css';
import PropTypes from 'prop-types';

interface TopicProps {
  id: string,
  title: string,
}

const Topic: React.FC<TopicProps> = ({ id, title }) => (
  <div className="topic-container">
    <div>{id}</div>
    <div>{title}</div>
  </div>
);

Topic.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Topic;
