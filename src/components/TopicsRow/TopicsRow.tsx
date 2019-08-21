import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
  setDetailsOpen?: undefined | ((detailsOpen: boolean) => void);
  isPreview: boolean,
  topics: ITopic[],
  rowNum: string,
  handleAddTopic: (rowNum: string) => void,
  handleDeleteTopic: (topicId: string) => void,
}

const TopicsRow: React.SFC<TopicsProps> = ({
  setDetailsOpen,
  isPreview,
  topics,
  handleAddTopic,
  rowNum,
  handleDeleteTopic,
}) => {
  const arrTopics = topics.map((topic) => (
    <Topic
      isPreview={isPreview}
      id={topic.id}
      title={topic.title}
      key={topic.id}
      handleDeleteTopic={handleDeleteTopic}
      setDetailsOpen={setDetailsOpen}
    />
  ));
  if (topics.length < 5 && !isPreview) {
    return (
      <div className="topics-row-container">
        <button
          className="add-topic__btn"
          type="button"
          onClick={() => { handleAddTopic(rowNum); }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <p className="AT-label">Add New Topic</p>
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
  setDetailsOpen: PropTypes.func.isRequired,
  isPreview: PropTypes.bool.isRequired,
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
