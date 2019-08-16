import React from 'react';
import './RoadmapTree.css';

interface Ichecklist {
  title: string;
  completed: boolean;
  __typename: string;
}

interface ITopic {
  id: string;
  title: string;
  description: string;
  resources: string;
  completed: boolean;
  checklist: Ichecklist;
}

interface RoadmapTreeProps {
  topics: ITopic;
}

const RoadmapTree: React.FC<RoadmapTreeProps> = () => <div>ROADMAPTREE</div>;

export default RoadmapTree;
