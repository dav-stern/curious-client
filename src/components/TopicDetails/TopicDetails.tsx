import React from 'react';
import PropTypes from 'prop-types';

interface ITopicDetailsProps {
  topicId: number
}

const TopicDetails : React.FC<ITopicDetailsProps> = ({ topicId }) => (<div>{topicId}</div>);

TopicDetails.propTypes = {
  topicId: PropTypes.number.isRequired,
};

export default TopicDetails;
