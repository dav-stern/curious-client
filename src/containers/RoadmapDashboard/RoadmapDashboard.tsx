import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { RouteComponentProps } from 'react-router-dom'; // eslint-disable-line
// import Button from '../../components/Button/Button';
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

// TREE COMPONENT:
// Create function to add Topic to the tree and send it via props


// DETAIL COMPONENT:
// Create function to send the id of the clicked topic via props

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

// TODO: Review component's types
const RoadmapDashboard = ({ match }: RouteComponentProps<TParams>) => {
  const [selectedTopic, setSelectedTopic] = useState(0);
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

  async function handleSelectTopic(e: React.MouseEvent<HTMLElement>) {
    setSelectedTopic(Number(e.currentTarget.id));
    // set state of topic id to pass it to TopicDetails
  }

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <Navbar />
      <RoadmapTree
        topics={data.topics}
        handleCreateTopic={handleCreateTopic}
        handleSelectTopic={handleSelectTopic}
      />
      <TopicDetails topicId={selectedTopic} />
    </div>
  );
};

export default RoadmapDashboard;
