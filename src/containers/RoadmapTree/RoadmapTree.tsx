import React from 'react';
import gql from 'graphql-tag';
import {
  useQuery,
  useLazyQuery,
  useMutation,
  useApolloClient,
} from '@apollo/react-hooks';
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

const DELETE_TOPIC = gql`
  mutation deleteTopic($topicId: ID!) {
    deleteTopic(id: $topicId)
}`;

const GET_ROADMAPS = gql`
query getRoadmap($id: ID!) {
  roadmaps(id: $id) {
    title
    category
    topics {
      title
      rowNumber
    }
  }
}
`;

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
  const client = useApolloClient();
  // let RmID: string | number | undefined = (window.location.pathname
  //   .split('/')
  //   .find((el, i, coll) => coll[i - 1] === 'roadmap' || coll[i - 1] === 'preview'));

  const { data, loading, refetch } = useQuery(GET_TOPICS, {
    variables: { id: matchId },
  });

  const [getRoadmapInfo] = useLazyQuery(GET_ROADMAPS, {
    variables: { id: '2' },
    fetchPolicy: 'network-only',
  });

  const isPreview = window.location.pathname.includes('preview');

  const [createTopic] = useMutation(CREATE_TOPIC);
  const [deleteTopic] = useMutation(DELETE_TOPIC);
  if (loading) return <p>Loading...</p>;

  const rowsData = data.topics.reduce(
    (obj: IRowsData, topic: ITopic) => {
      const { rowNumber } = topic;
      if (obj[rowNumber]) obj[rowNumber].push(topic);
      else obj[rowNumber] = [topic]; // eslint-disable-line no-param-reassign
      return obj;
    }, {},
  );

  const keys = Object.keys(rowsData);
  const dataLen = keys.length;
  if (dataLen === 0) {
    const arrNum = keys.map((key) => Number(key));
    if (arrNum.length) rowsData[Math.max(...arrNum) + 1] = [];
    else rowsData[0] = [];
  }

  async function handleAddTopic(rowNum: string) {
    try {
      const { data }: any = await createTopic({ // eslint-disable-line no-shadow
        variables: { RoadmapId: matchId, title: '', rowNumber: Number(rowNum) },
      });
      // Get the id of the new topic and save it on cache: property "selectedTopic"
      client.writeData({ data: { selectedTopicId: data.createTopic.id } });
      // TODO: synchronize the title field on topics details with title <p> on Topic component
      await refetch();
    } catch (err) {
      console.log('not possible to create new topic on this row!!'); // eslint-disable-line no-console
    }
  }

  async function handleDeleteTopic(topicId: string) {
    try {
      client.writeData({ data: { selectedTopicId: '' } });
      await deleteTopic({ variables: { topicId } });
      refetch();
    } catch (err) {
      console.log('This topic doesn\'t exist anymore!!'); // eslint-disable-line no-console
    }
  }

  function handleAddRow() {
    const arrNum = keys.map((key) => Number(key));
    const newRowNum = Math.max(...arrNum) + 1;
    const rowNum = newRowNum.toString();
    handleAddTopic(rowNum);
  }

  const topicsRows = Object.keys(rowsData).map((rowNumber) => (
    <TopicsRow
      isPreview={isPreview}
      topics={rowsData[rowNumber]}
      key={rowNumber}
      rowNum={rowNumber}
      handleAddTopic={handleAddTopic}
      handleDeleteTopic={handleDeleteTopic}
    />
  ));
  const buttonAddRow = dataLen > 0 && (<button type="button" onClick={handleAddRow}>Add Row</button>);
  return (
    <div>
      <div>
        <div>
          {topicsRows}
        </div>
        {(!isPreview) ? <div>{buttonAddRow}</div> : null}
      </div>
      <button
        type="button"
        onClick={() => { getRoadmapInfo(); }}
      >
        Fork
      </button>
    </div>
  );
};

RoadmapTree.propTypes = {
  matchId: PropTypes.string.isRequired,
};

export default RoadmapTree;
