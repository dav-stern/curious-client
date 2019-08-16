import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
// import Button from '../../components/Button/Button';
import './RoadmapDashboard.css';
import RoadmapTree from '../../components/RoadmapTree/RoadmapTree';
import TopicDetails from '../../components/TopicDetails/TopicDetails';

// Set up query to get all topics for the Roadmap
const GET_TOPICS = gql`
  query gettopics($id: ID!) {
    topics(id: $id) {
      id
      title
      description
      resources
      completed
      checklist {
        title
        completed
      }
    }
}`;

// TREE COMPONENT:
// Create function to add Topic to the tree and send it via props


// DETAIL COMPONENT:
// Create function to send the id of the clicked topic via props


const RoadmapDashboard: React.FC = () => {
  // const RoadmapId = 77; // TODO: make this dynamic ('/roadmap/id')
  const { data, loading } = useQuery(GET_TOPICS, {
    variables: { id: 77 },
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <RoadmapTree topics={data.topics} />
      <TopicDetails />
    </div>
  );
};

export default RoadmapDashboard;
