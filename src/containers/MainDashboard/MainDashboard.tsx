import React, { useState } from 'react';
import gql from 'graphql-tag';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Button from '../../components/Button/Button';
import './MainDashboard.css';
import RoadmapItemForm from '../../components/RoadmapItemForm/RoadmapItemForm';

interface IRoadmap {
  title: string;
  id: string;
  category: string;
  __typename: string;
}

interface IUserID {
  id: number;
}

// TODO: do we need to query for category? Should we render it on each roadmap item?
// roadmaps (query)
const GET_ROADMAPS = gql`
query getRoadmap($id: ID!) {
  roadmaps(id: $id) {
    id
    title
    category
  }
}
`;

// create roadmap (mutation)
const CREATE_ROADMAP = gql`
  mutation createroadmaps($id: ID!, $title: String!, $category: String!) {
    createRoadmap(UserId: $id, title: $title, category: $category) {
      id
      title
      category
    }
  }
`;

const MainDashboard: React.FC = () => {
  const [titleInput, setTitleInput] = useState('');
  const [selectionInput, setSelectionInput] = useState('IT');
  const [flag, setFlag] = useState(false);
  // get userID from token
  const token: string | null = localStorage.getItem('token');
  const { id } = jwtDecode(token!);

  // fetching roadmaps from database
  const { loading, data, refetch } = useQuery(GET_ROADMAPS, {
    variables: { id },
  });
  // creating 'ADD_ROADMAP' mutation
  const [createRoadmap] = useMutation(CREATE_ROADMAP, {
    variables: { id, title: titleInput, category: selectionInput },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value);
  };

  const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectionInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createRoadmap();
    setTitleInput('');
    refetch();
  };

  // if the data is still loading
  if (loading) return <p>Loading</p>;
  // else if user has no roadmaps yet show two buttons: 'Discover' and 'Add New Roadmap'
  if (data.roadmaps.length < 1 && !flag) {
    return (
      <div className="button-container">
        <Link to="'/discover"><Button handleClick={() => {}} value="Discover" /></Link>
        <Button handleClick={() => setFlag(true)} value="Add New Roadmap" />
      </div>
    );
  }
  // else render roadmaps on dashboard
  const roadmaps = data.roadmaps.map((item: IRoadmap) => <Link id="roadmaps" key={item.id} to={`/roadmap/${item.id}`}>{item.title}</Link>);
  return (
    <div className="container">
      {roadmaps}
      <RoadmapItemForm
        handleChange={handleChange}
        handleSelection={handleSelection}
        handleSubmit={handleSubmit}
        titleInput={titleInput}
      />
    </div>
  );
};

export default MainDashboard;
