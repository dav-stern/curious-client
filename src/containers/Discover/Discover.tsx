import React from 'react';
import './Discover.css';
// import { useApolloClient } from '@apollo/react-hooks';
import Navbar from '../../components/Navbar/Navbar';
import Linkbar from '../../components/Linkbar/Linkbar';
import categories from '../../categories';

const Discover: React.FC = () => {
  // const client = useApolloClient();
  return (
    <>
      <Navbar />
      <Linkbar categories={categories} />
    </>
  );
};


export default Discover;
