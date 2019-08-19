import React from 'react';
import { RouteComponentProps } from 'react-router-dom'; // eslint-disable-line
import './RoadmapDashboard.css';
import RoadmapTree from '../RoadmapTree/RoadmapTree';
import TopicDetails from '../../components/TopicDetails/TopicDetails';
import Navbar from '../../components/Navbar/Navbar';

type TParams = { id: string };

// TODO: Review this component's type
const RoadmapDashboard = ({ match }: RouteComponentProps<TParams>) => (
  <div>
    <Navbar />
    <div className="roadmap-tree-container">
      <RoadmapTree
        matchId={match.params.id}
      />
    </div>
    <TopicDetails />
  </div>
);

export default RoadmapDashboard;
