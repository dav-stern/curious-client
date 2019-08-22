import React from 'react';
import gql from 'graphql-tag';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import './Topic.css';
import PropTypes from 'prop-types';

interface TopicNodeProps {
  isPreview: boolean,
  id: string,
  title: string
  handleDeleteTopic: (topicId: string) => void
}

const Topic: React.FC<TopicNodeProps> = ({
  id,
  title,
  isPreview,
  handleDeleteTopic,
}) => {
  const client = useApolloClient();
  function handleSelectTopic(topicId: string) {
    client.writeData({ data: { selectedTopicId: topicId } });
  }
  const { data } = useQuery(gql`{ selectedTopicTitle, selectedTopicId }`);
  return (
    // TODO: "Coding for the keyboard is important for users with physical disabilities
    // who cannot use a mouse, AT compatibility, and screenreader users."
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className={isPreview ? "topic-container no-anim" : "topic-container"} onClick={() => { handleSelectTopic(id); }} role="button" tabIndex={-1} id={id}>
      {
        (!isPreview)
          ? (
            <button
              className="delete-button"
              type="button"
              onClick={() => { handleDeleteTopic(id); }}
            >
              <span role="img" aria-label="delete button">❌</span>
            </button>
          )
          : null
      }
      {/* <div>{id}</div> */}
      <div className="topic-content">
        {data.selectedTopicTitle && id === data.selectedTopicId ? data.selectedTopicTitle : title}
      </div>
    </div>
  );
};

Topic.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleDeleteTopic: PropTypes.func.isRequired,
  isPreview: PropTypes.bool.isRequired,
}

export default Topic;
