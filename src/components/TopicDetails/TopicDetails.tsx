import React, { useState } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

import './TopicDetails.css';

interface ITopicDetailsProps {
  topicId: number
}

const GET_TOPIC_DETAILS = gql`
  query gettopics($id: ID!) {
    topics(TopicId: $id) {
      id
      title
      description
      resources
      completed
      rowNumber
      checklist {
        title
        completed
      }
    }
  }
`;

const UPDATE_TOPIC = gql`
  mutation updateTopic($id: ID! $title: String, $description: String $resources: String $rowNumber: Int) {
    updateTopic(id: $id title: $title, description: $description, resources: $resources, rowNumber: $rowNumber) {
      id
      title
      description
      resources
      rowNumber
    }
  }
`;

// create onClick function that toggles CSS displays for all fields
// create function to use mutation for the save button

const TopicDetails : React.FC<ITopicDetailsProps> = ({ topicId }) => {
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [resourcesInput, setResourcesInput] = useState('');

  const [updateTopic] = useMutation(UPDATE_TOPIC, {
    variables: {
      id: topicId,
      title: titleInput,
      description: descriptionInput,
      resources: resourcesInput,
    },
  });

  const { data, loading, refetch } = useQuery(GET_TOPIC_DETAILS, {
    variables: { id: topicId },
  });
  if (loading) return <p>Loading...</p>;
  if (!data.topics[0]) return null;

  // add below -> , completed, Checklist
  const { title, description, resources } = data.topics[0];

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputClass = e.target.className;
    if (inputClass === 'topic-title') setTitleInput(e.target.value);
    if (inputClass === 'topic-description') setDescriptionInput(e.target.value);
    if (inputClass === 'topic-resources') setResourcesInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateTopic();
    refetch();
  };

  return (
    <div className="topic-details-card">
      <form onSubmit={handleSubmit}>
        <div className="title-block">
          <textarea className="topic-title" value={titleInput} onChange={handleChange} />
        </div>
        <div className="description-block">
          <h4>Description:</h4>
          <textarea className="topic-description" value={descriptionInput} onChange={handleChange} />
        </div>
        <div className="resources-block">
          <h4>Resources:</h4>
          <textarea className="topic-resources" value={resourcesInput} onChange={handleChange} />
        </div>
        <button type="submit">Save</button>
      </form>
      {/* <Checklist /> */}
    </div>
  );
};

TopicDetails.propTypes = {
  topicId: PropTypes.number.isRequired,
};

export default TopicDetails;
