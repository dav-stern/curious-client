import React from 'react';
import './Topic.css';
import PropTypes from 'prop-types';

interface TopicNodeProps {
  id: string,
  title: string,
  handleSelectTopic: (e: React.MouseEvent<HTMLElement>) => void
}

const Topic: React.FC<TopicNodeProps> = ({ id, title, handleSelectTopic }) => (
  // TODO: "Coding for the keyboard is important for users with physical disabilities
  // who cannot use a mouse, AT compatibility, and screenreader users."
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  <div className="topic-container" onClick={handleSelectTopic} role="button" tabIndex={-1} id={id}>
    <div>{id}</div>
    <div>{title}</div>
  </div>
);

Topic.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleSelectTopic: PropTypes.func.isRequired,
};

export default Topic;
