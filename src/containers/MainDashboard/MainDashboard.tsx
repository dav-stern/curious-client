import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import Button from '../../components/Button/Button';
import './MainDashboard.css';
import RoadmapItemForm from '../../components/RoadmapItemForm/RoadmapItemForm';

interface IRoadmap {
  title: string;
  id: string;
  category: string;
  __typename: string;
}

// roadmaps (query)
const GET_ROADMAPS = gql`
query getroadmaps($id: ID!) {
  roadmaps(id: $id) {
    title
    id
    category
  }
}
`;

/* const GET_LOCAL_ROADMAPS = gql`
{
  roadmaps {
    title
    id
    category
  }
}
`; */

/* const GET_USER_ID = gql`
{
  id
}
`; */

// create roadmap (mutation)
const ADD_ROADMAP = gql`
  mutation createroadmaps($UserId: ID!, $title: String!, $category: String!) {
    createRoadmap(UserId: $UserId, title: $title, category: $category) {
      id
      title
      category
    }
  }
`;


const MainDashboard: React.FC = () => {
  const client = useApolloClient();
  const [titleInput, setTitleInput] = useState('');
  const [selectionInput, setSelectionInput] = useState('');
  const [flag, setFlag] = useState(false);
  // get userID from cache
  // const userID = client.cache.readQuery({ query: GET_USER_ID });

  // fetching roadmaps from database
  const { loading, data } = useQuery(GET_ROADMAPS, {
    variables: { id: 30 },
  });

  // adding roadmap
  const [roadmap] = useMutation(ADD_ROADMAP, {
    variables: { UserId: 30, title: titleInput, category: selectionInput },
  });

  const routeToDiscover = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('routeToDiscover', e); // eslint-disable-line no-console
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { value } = target;
    setTitleInput(value);
  };

  const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { target } = e;
    const { value } = target;
    setSelectionInput(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTitleInput(titleInput);
    setSelectionInput(selectionInput);
    const newRoadmap: any = await roadmap();
    client.writeData({ data: { roadmaps: [newRoadmap.data.createRoadmap] } });
    // const current = client.cache.readQuery({ query: GET_LOCAL_ROADMAPS });
    setTitleInput('');
    // const result = client.readQuery({ query: GET_ROADMAPS });
    // console.log(result);
  };

  // check if user has roadmaps created
  if (!data && !flag) {
    return (
      <div className="button-container">
        <Button handleClick={routeToDiscover} value="Browse" />
        <Button handleClick={() => setFlag(true)} value="Add new Roadmap" />
      </div>
    );
  }
  if (!loading) {
    const roadmaps = data.roadmaps.map((item: IRoadmap) => <div id="roadmaps" key={item.id}>{item.title}</div>);
    return (
      <div className="roadmap-container">
        {roadmaps}
        <RoadmapItemForm
          handleChange={handleChange}
          handleSelection={handleSelection}
          handleSubmit={handleSubmit}
          titleInput={titleInput}
        />
      </div>
    );
  }
  return (null);
};


export default MainDashboard;
