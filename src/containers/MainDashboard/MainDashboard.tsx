import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import Button from '../../components/Button/Button';
import './MainDashboard.css';
import RoadmapItemForm from '../../components/RoadmapItemForm/RoadmapItemForm';
import Navbar from '../../components/Navbar/Navbar';

interface IRoadmap {
  title: string;
  id: string;
  category: string;
  __typename: string;
}

interface IUserID {
  id: number;
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

const GET_LOCAL_ROADMAPS = gql`
{
  roadmaps {
    title
    id
    category
  }
}
`;

const GET_USER_ID = gql`
{
  id
}
`;

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
  const userID: IUserID | any = client.cache.readQuery({ query: GET_USER_ID });

  // fetching roadmaps from database
  const { loading, data, refetch } = useQuery(GET_ROADMAPS, {
    variables: { id: userID.id },
  });

  // adding roadmap
  const [roadmap] = useMutation(ADD_ROADMAP, {
    variables: { id: userID.id, title: titleInput, category: selectionInput },
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
    const previousRoadmaps: any = client.cache.readQuery({ query: GET_LOCAL_ROADMAPS });
    client.writeData({
      data: { roadmaps: [...previousRoadmaps.roadmaps].concat(newRoadmap.data.createRoadmap) },
    });
    refetch();
    setTitleInput('');
  };

  // check if user has roadmaps created
  if (!data && !flag) {
    return (
      <div>
        <Navbar />
        <div className="button-container">
          <Button handleClick={routeToDiscover} value="Browse" />
          <Button handleClick={() => setFlag(true)} value="Add new Roadmap" />
        </div>
      </div>
    );
  }
  if (!loading) {
    // store roadmaps in cache and render them on dashboard
    client.writeData({ data: { roadmaps: data.roadmaps } });
    const roadmapsCache = client.readQuery({ query: GET_LOCAL_ROADMAPS });
    const roadmaps = roadmapsCache.roadmaps.map((item: IRoadmap) => <div id="roadmaps" key={item.id}>{item.title}</div>);

    return (
      <div>
        <Navbar />
        <div className="roadmap-container">
          {roadmaps}
          <RoadmapItemForm
            handleChange={handleChange}
            handleSelection={handleSelection}
            handleSubmit={handleSubmit}
            titleInput={titleInput}
          />
        </div>
      </div>
    );
  }
  return (null);
};


export default MainDashboard;
