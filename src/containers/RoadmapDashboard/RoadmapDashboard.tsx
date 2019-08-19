import React from 'react';
import gql from 'graphql-tag';
import { RouteComponentProps } from 'react-router-dom'; // eslint-disable-line
import { useQuery } from '@apollo/react-hooks';
import './RoadmapDashboard.css';
import RoadmapTree from '../RoadmapTree/RoadmapTree';
import TopicDetails from '../../components/TopicDetails/TopicDetails';
import Navbar from '../../components/Navbar/Navbar';

type TParams = { id: string };

const GET_TOPIC_ID = gql`{
  selectedTopicId
}
`;

// TODO: Review this component's type
const RoadmapDashboard = ({ match }: RouteComponentProps<TParams>) => {
  const { data } = useQuery(GET_TOPIC_ID);
  return (
    <div>
      <Navbar />
      <div className="roadmap-tree-container">
        <RoadmapTree
          matchId={match.params.id}
        />
      </div>
      <TopicDetails selectedTopicId={data.selectedTopicId} />
    </div>
  );
};

export default RoadmapDashboard;
