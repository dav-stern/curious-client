import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

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

// create onClick function that toggles CSS displays for all fields
// create function to use mutation for the save button

const TopicDetails : React.FC<ITopicDetailsProps> = ({ topicId }) => {
  const { data, loading, error } = useQuery(GET_TOPIC_DETAILS, {
    variables: { id: topicId },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!data.topics[0]) return null;

  // add below -> , completed, Checklist
  const { title, description, resources } = data.topics[0];
  return (
    <div className="topic-details-card">
      <div className="topic-title-block">
        <h3 className="toipc-title">{title}</h3>
        <input className="topic-title-draft" />
      </div>

      <div className="topic-description-block">
        <h4>Description</h4>
        <div className="topic-description">
          <p>{description}</p>
        </div>
        <textarea className="topic-description-draft" />
      </div>

      <div className="topic-resources-block">
        <h3>Resources</h3>
        <div className="topic-resources">
          {resources}
        </div>
        <textarea className="topic-resources-draft" />
      </div>

      {/* <Checklist /> */}
      <button type="submit">Save</button>
    </div>
  );
};

TopicDetails.propTypes = {
  topicId: PropTypes.number.isRequired,
};

export default TopicDetails;
