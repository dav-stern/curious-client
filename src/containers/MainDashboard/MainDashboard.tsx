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
  mutation createroadmaps($UserId: ID!, $title: String!, $category: String!) {
    createRoadmap(UserId: $UserId, title: $title, category: $category) {
      id
      title
      category
    }
  }
`;


const MainDashboard: React.FC = () => {
  // const client = useApolloClient();
  const [titleInput, setTitleInput] = useState('');
  const [selectionInput, setSelectionInput] = useState('');
  const [flag, setFlag] = useState(false);
  const initialRoadmap: any = [];
  const [roadmaps, setRoadmaps] = useState(initialRoadmap);

  const { data } = useQuery(GET_ROADMAPS, {
    variables: { id: 7 },
  });
  const [roadmap] = useMutation(ADD_ROADMAP, {
    variables: { UserId: 7, title: titleInput, category: selectionInput },
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
    // client.writeData({ roadmaps: [...roadmaps, newRoadmap] })
    setRoadmaps({ roadmaps: [...roadmaps, newRoadmap] });
    setTitleInput('');
  };

  const changeFlag = () => { setFlag(true); };

  if (!data.roadmaps.length && !flag) {
    return (
      <div className="button-container">
        <Button handleClick={routeToDiscover} value="Browse" />
        <Button handleClick={changeFlag} value="Add new Roadmap" />
      </div>
    );
  }
  return (
    <div className="roadmap-container">
      <div id="roadmaps">EXISTING ROADMAP</div>
      <div id="roadmaps">EXISTING ROADMAP</div>
      <div id="roadmaps">EXISTING ROADMAP</div>
      <div id="roadmaps">EXISTING ROADMAP</div>
      <div id="roadmaps">EXISTING ROADMAP</div>
      <div id="roadmaps">EXISTING ROADMAP</div>
      <div id="roadmaps">EXISTING ROADMAP</div>
      <div id="roadmaps">EXISTING ROADMAP</div>
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
