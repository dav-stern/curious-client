import React from 'react';
import PropTypes from 'prop-types';
import TopicsRow from '../../components/TopicsRow/TopicsRow';
import './RoadmapTree.css';

interface ITopic {
  id: string
  title: string
  rowNumber: number,
}

interface RoadmapTreeProps {
  topics: ITopic[]
  handleCreateTopic: () => void
}

interface IRowsData {
  [keys: string]: ITopic[]
}

const RoadmapTree: React.SFC<RoadmapTreeProps> = ({ topics, handleCreateTopic }) => {
  const rowsData: IRowsData = topics.reduce((obj: IRowsData, topic: ITopic) => {
    const { rowNumber } = topic;
    if (obj[rowNumber]) obj[rowNumber].push(topic);
    else obj[rowNumber] = [topic]; // eslint-disable-line no-param-reassign
    return obj;
  }, {});
  const topicsRows = Object.keys(rowsData).map((rowNumber) => (
    <TopicsRow
      topics={rowsData[rowNumber]}
      key={rowNumber}
      handleCreateTopic={handleCreateTopic}
    />
  ));

  return (
    <div>
      {topicsRows}
      <TopicsRow topics={[]} handleCreateTopic={handleCreateTopic} />
    </div>
  );
};

RoadmapTree.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    rowNumber: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  handleCreateTopic: PropTypes.func.isRequired,
};

export default RoadmapTree;
