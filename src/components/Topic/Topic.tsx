import React from 'react';
import gql from 'graphql-tag';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import './Topic.css';
import PropTypes from 'prop-types';

interface TopicNodeProps {
  id: string,
  title: string
  handleDeleteTopic: (topicId: string) => void
}

const Topic: React.FC<TopicNodeProps> = ({ id, title, handleDeleteTopic }) => {
  const client = useApolloClient();
  function handleSelectTopic(topicId: string) {
    client.writeData({ data: { selectedTopicId: topicId } });
  }
  const { data } = useQuery(gql`{ selectedTopicTitle, selectedTopicId }`);
  return (
    // TODO: "Coding for the keyboard is important for users with physical disabilities
    // who cannot use a mouse, AT compatibility, and screenreader users."
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className="topic-container" onClick={() => { handleSelectTopic(id); }} role="button" tabIndex={-1} id={id}>
      <button type="button" onClick={() => { handleDeleteTopic(id); }}><span>𝗑</span></button>
      <div>{id}</div>
      <div>
        {data.selectedTopicTitle && id === data.selectedTopicId ? data.selectedTopicTitle : title}
      </div>
    </div>
  );
};

Topic.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleDeleteTopic: PropTypes.func.isRequired,
};

export default Topic;
