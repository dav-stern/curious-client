import React from 'react';
import './Discover.css';
import { useApolloClient } from '@apollo/react-hooks';
import Navbar from '../../components/Navbar/Navbar';

const Discover: React.FC = () => {
  const client = useApolloClient();
  console.log(client); // eslint-disable-line
  return (
    <>
      <Navbar />
    </>
  );
};


export default Discover;
