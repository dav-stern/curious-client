import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { RouteComponentProps } from 'react-router-dom'; // eslint-disable-line
import './RoadmapDashboard.css';
import RoadmapTree from '../RoadmapTree/RoadmapTree';
import TopicDetails from '../../components/TopicDetails/TopicDetails';
import Navbar from '../../components/Navbar/Navbar';

// Set up query to get all topics for the Roadmap
const GET_TOPICS = gql`
  query gettopics($id: ID!) {
    topics(RoadmapId: $id) {
      id
      title
      rowNumber
    }
}`;

const CREATE_TOPIC = gql`
  mutation createtopic($RoadmapId: ID!, $title: String!, $rowNumber: Int!) {
    createTopic(RoadmapId: $RoadmapId, title: $title, rowNumber: $rowNumber) {
      title
      id
    }
}`;

type TParams = { id: string };

interface IChecklistItem {
  title: string,
  completed: boolean,
}

interface ITopic {
  id: string
  title: string
  rowNumber: number,
}

// TODO: Review this component's type
const RoadmapDashboard = ({ match }: RouteComponentProps<TParams>) => {
  const { data, loading, refetch } = useQuery(GET_TOPICS, {
    variables: { id: match.params.id },
  });

  const [createTopic] = useMutation(CREATE_TOPIC, {
    variables: { RoadmapId: match.params.id, title: 'urso', rowNumber: 0 },
  });

  async function handleCreateTopic() {
    await createTopic();
    refetch();
  }

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <Navbar />
      <div className="roadmap-tree-container">
        <RoadmapTree
          topics={data.topics}
          handleCreateTopic={handleCreateTopic}
        />
      </div>
      <TopicDetails />
    </div>
  );
};

export default RoadmapDashboard;
