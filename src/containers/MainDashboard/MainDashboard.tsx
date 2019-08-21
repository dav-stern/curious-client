import React, { useState } from 'react';
import gql from 'graphql-tag';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Button from '../../components/Button/Button';
import './MainDashboard.css';
import RoadmapItemForm from '../../components/RoadmapItemForm/RoadmapItemForm';
import Navbar from '../../components/Navbar/Navbar';
import categories from '../../categories';

interface IRoadmap {
  id: string;
  title: string;
  category: string;
  __typename: string;
}

// roadmaps (query)
const GET_ROADMAPS = gql`
query getRoadmap($UserId: ID!) {
  roadmaps(UserId: $UserId) {
    id
    title
    category
    topics {
      id
      title
      description
      resources
      completed
      checklist {
        id
        title
        completed
      }
    }
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

// delete roadmap (mutation)
const DELETE_ROADMAP = gql`
  mutation deleteroadmap($id: ID!) {
    deleteRoadmap(id: $id)
  }
`;

const MainDashboard: React.FC = () => {
  const [titleInput, setTitleInput] = useState('');
  const [selectionInput, setSelectionInput] = useState('Music');
  const [flag, setFlag] = useState(false);
  // get userID from token
  // TODO: abstract this into an authentication service
  const token: string | null = localStorage.getItem('token');
  const { id } = jwtDecode(token!);

  // fetching roadmaps from database
  const { loading, data, refetch } = useQuery(GET_ROADMAPS, {
    variables: { UserId: id },
  });
  // creating 'ADD_ROADMAP' mutation
  const [createRoadmap] = useMutation(CREATE_ROADMAP, {
    variables: { id, title: titleInput, category: selectionInput },
  });
  // deleting roadmap
  const [deleteRoadmap]: any = useMutation(DELETE_ROADMAP);

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

  // eslint-disable-next-line no-shadow
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    await deleteRoadmap({
      variables: { id },
    });
    refetch();
  };

  // if the data is still loading
  if (loading) return null;
  // else if user has no roadmaps yet show two buttons: 'Discover' and 'Add New Roadmap'
  if (data.roadmaps.length < 1 && !flag) {
    return (
      <div>
        <Navbar />
        <div className="button-container">
          <Link to="/discover"><Button handleClick={() => { }} value="Discover" /></Link>
          <Button handleClick={() => setFlag(true)} value="Add New Roadmap" />
        </div>
      </div>
    );
  }

  // else render roadmaps on dashboard
  const results = data.roadmaps.map((item: IRoadmap) => (
    <Link className="roadmap-container" key={item.id} to={`/roadmap/${item.id}`}>
      <div id="delete-button">
        <button type="button" onClick={(e) => handleDelete(e, item.id)}><span id="delete-x" role="img" aria-label="delete">❌</span></button>
      </div>
      <div id="middle">
        {item.title}
      </div>
    </Link>
  ));
  return (
    <div>
      <Navbar />
      <div className="container">
        {results}
        <RoadmapItemForm
          handleChange={handleChange}
          handleSelection={handleSelection}
          handleSubmit={handleSubmit}
          titleInput={titleInput}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default MainDashboard;
