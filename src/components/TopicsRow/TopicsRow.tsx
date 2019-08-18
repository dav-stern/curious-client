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
  handleAddTopic: (e: React.MouseEvent<HTMLButtonElement>) => void
  handleAddRow?: () => void
}

const TopicsRow: React.SFC<TopicsProps> = ({
  topics,
  handleAddTopic,
  rowNum,
  handleAddRow,
}) => {
  const arrTopics = topics.map((topic) => (
    <Topic id={topic.id} title={topic.title} key={topic.id} />
  ));
  const addRowButton = arrTopics.length > 0 && handleAddRow
    && (<button onClick={handleAddRow} id={rowNum} type="button">Add Row</button>);
  return (
    <div className="topics-row-container">
      <div>
        <button
          type="button"
          onClick={handleAddTopic}
          id={rowNum}
        >
          Add Topic
        </button>
      </div>
      <div className="topics-container">{arrTopics}</div>
      {addRowButton}
    </div>
  );
};

TopicsRow.defaultProps = {
  handleAddRow: undefined,
};

TopicsRow.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    rowNumber: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  handleAddTopic: PropTypes.func.isRequired,
  rowNum: PropTypes.string.isRequired,
  handleAddRow: PropTypes.func,
};

export default TopicsRow;
