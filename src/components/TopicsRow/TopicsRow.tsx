import React from 'react';
import PropTypes from 'prop-types';
import Topic from '../Topic/Topic';
import './TopicsRow.css';

interface IChecklistItem {
  title: string,
  completed: boolean,
}

interface ITopic {
  id: string
  rowNumber: number
  title: string
}

interface TopicsProps {
  topics: ITopic[]
  handleCreateTopic: () => void
}

const TopicsRow: React.SFC<TopicsProps> = ({ topics, handleCreateTopic }) => {
  const arrTopics = topics.map((topic) => (
    <Topic id={topic.id} title={topic.title} key={topic.id} />
  ));
  return (
    <div className="topics-row-container">
      <div>
        <button type="button" value="Create new Topic" onClick={handleCreateTopic}>create</button>
      </div>
      <div>{arrTopics}</div>
    </div>
  );
};

TopicsRow.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    rowNumber: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  handleCreateTopic: PropTypes.func.isRequired,
};

export default TopicsRow;
