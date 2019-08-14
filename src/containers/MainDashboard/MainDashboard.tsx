import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Button from '../../components/Button/Button';
import './MainDashboard.css';
import RoadmapItem from '../../components/RoadmapItem/RoadmapItem';

// roadmaps (query)
const GET_ROADMAPS = gql`
{
  roadmaps {
    title
  }
}
`;

// create roadmap (mutation)
const ADD_ROADMAP = gql`
  mutation createroadmaps($title: String!, $category: String!) {
    createRoadmap(title: $title, category: $category) {
      id
      title
      category
    }
  }
`;

const MainDashboard: React.FC = () => {
  const [titleInput, setTitleInput] = useState('');
  const [selectionInput, setSelectionInput] = useState('');

  const { data } = useQuery(GET_ROADMAPS, {
    variables: { id: 7 },
  });
  const [roadmap] = useMutation(ADD_ROADMAP);

  const routeToDiscover = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('routeToDiscover', e); // eslint-disable-line no-console
  };

  const addRoadmap = async () => {
    const newRoadmap = await roadmap();
    console.log(newRoadmap); // eslint-disable-line no-console
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTitleInput(titleInput);
    roadmap();
    setTitleInput('');
  };

  if (data.roadmaps.length) {
    return (
      <div className="container">
        <Button handleClick={routeToDiscover} value="browse" />
        <Button handleClick={addRoadmap} value="Add new Roadmap" />
      </div>
    );
  }
  return (
    <div className="container">
      <RoadmapItem
        handleChange={handleChange}
        handleSelection={handleSelection}
        handleSubmit={handleSubmit}
        titleInput={titleInput}
      />
    </div>
  );
};


export default MainDashboard;
