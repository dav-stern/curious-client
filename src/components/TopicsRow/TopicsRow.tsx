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
  rowNum: string
  handleAddTopic: (rowNum: string) => void
  handleDeleteTopic: (topicId: string) => void
}

const TopicsRow: React.SFC<TopicsProps> = ({
  topics,
  handleAddTopic,
  rowNum,
  handleDeleteTopic,
}) => {
  const arrTopics = topics.map((topic) => (
    <Topic id={topic.id} title={topic.title} key={topic.id} handleDeleteTopic={handleDeleteTopic} />
  ));
  if (topics.length < 5) {
    return (
      <div className="topics-row-container">
        <div>
          <button
            type="button"
            onClick={() => { handleAddTopic(rowNum); }}
          >
            Add Topic
          </button>
        </div>
        <div className="topics-container">{arrTopics}</div>
      </div>
    );
  }
  return (
    <div className="topics-row-container">
      <div className="topics-container">{arrTopics}</div>
    </div>
  );
};

TopicsRow.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    rowNumber: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  handleAddTopic: PropTypes.func.isRequired,
  rowNum: PropTypes.string.isRequired,
  handleDeleteTopic: PropTypes.func.isRequired,
};

export default TopicsRow;
