import React from 'react';
import PropTypes from 'prop-types';
import './RoadmapTree.css';
import Topic from '../Topic/Topic';
import Button from '../Button/Button';

interface IChecklistItem {
  title: string,
  completed: boolean,
}

interface ITopic {
  id: string
  title: string
  description: string
  resources: string
  completed: boolean
  checklist: IChecklistItem[]
}

interface RoadmapTreeProps {
  topics: ITopic[]
  handleCreateTopic: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const RoadmapTree: React.SFC<RoadmapTreeProps> = ({ topics, handleCreateTopic }) => {
  const arrTopics = topics.map((topic) => (
    <Topic id={topic.id} title={topic.title} key={topic.id} />));

  return (
    <div>
      <div>
        <Button value="Create new Topic" handleClick={handleCreateTopic} />
      </div>
      {arrTopics}
      <div>ROADMAPTREE</div>
    </div>
  );
};

RoadmapTree.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    resources: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    checklist: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired).isRequired,
  }).isRequired).isRequired,
  handleCreateTopic: PropTypes.func.isRequired,
};

export default RoadmapTree;
