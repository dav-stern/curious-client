import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { RouteComponentProps } from 'react-router-dom'; // eslint-disable-line
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

const CREATE_TOPIC = gql`
  mutation createtopic($RoadmapId: ID!, $title: String!) {
    createTopic(RoadmapId: $RoadmapId, title: $title) {
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
  description: string
  resources: string
  completed: boolean
  checklist: IChecklistItem[]
}

// TODO: Review component's types
const RoadmapDashboard = ({ match }: RouteComponentProps<TParams>) => {
  const { data, loading, refetch } = useQuery(GET_TOPICS, {
    variables: { id: match.params.id },
  });

  const [createTopic] = useMutation(CREATE_TOPIC, {
    variables: { RoadmapId: match.params.id, title: 'urso' },
  });

  async function handleCreateTopic() {
    createTopic();
    refetch();
  }

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <RoadmapTree
        topics={data.topics}
        handleCreateTopic={handleCreateTopic}
      />
      <TopicDetails />
    </div>
  );
};

export default RoadmapDashboard;
