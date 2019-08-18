import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import TopicsRow from '../../components/TopicsRow/TopicsRow';
import './RoadmapTree.css';

// Setup query to get all topics for the Roadmap
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

interface ITopic {
  id: string
  title: string
  rowNumber: number,
}

interface RoadmapTreeProps {
  matchId: string,
}

interface IRowsData {
  [keys: string]: ITopic[]
}

const RoadmapTree: React.SFC<RoadmapTreeProps> = ({ matchId }) => {
  const [newRow, setNewRow] = useState(false);
  const { data, loading, refetch } = useQuery(GET_TOPICS, {
    variables: { id: matchId },
  });
  const [createTopic] = useMutation(CREATE_TOPIC);
  if (loading) return <p>Loading...</p>;

  const rowsData = data.topics.reduce(
    (obj: IRowsData, topic: ITopic) => {
      const { rowNumber } = topic;
      if (obj[rowNumber]) obj[rowNumber].push(topic);
      else obj[rowNumber] = [topic]; // eslint-disable-line no-param-reassign
      return obj;
    }, {},
  );

  async function handleAddTopic(e: React.MouseEvent<HTMLButtonElement>) {
    try {
      const rowNum = e.currentTarget.id;
      await createTopic({
        variables: { RoadmapId: matchId, title: 'urso', rowNumber: Number(rowNum) },
      });
      await refetch();
      setNewRow(false);
    } catch (err) {
      console.log('not possible to create new topic on this row!!');
    }
  }

  function handleAddRow() {
    setNewRow(true);
  }

  let dataLen = Object.keys(rowsData).length;
  if (newRow || dataLen === 0) {
    rowsData[dataLen + 1] = [];
    dataLen += 1;
  }

  const topicsRows = Object.keys(rowsData).map((rowNumber, idx) => {
    if (idx === dataLen - 1) {
      return (
        <TopicsRow
          topics={rowsData[rowNumber]}
          key={rowNumber}
          rowNum={rowNumber}
          handleAddTopic={handleAddTopic}
          handleAddRow={handleAddRow}
        />
      );
    }
    return (
      <TopicsRow
        topics={rowsData[rowNumber]}
        key={rowNumber}
        rowNum={rowNumber}
        handleAddTopic={handleAddTopic}
      />
    );
  });

  return (
    <div>
      {topicsRows}
    </div>
  );
};

RoadmapTree.propTypes = {
  matchId: PropTypes.string.isRequired,
};

export default RoadmapTree;
