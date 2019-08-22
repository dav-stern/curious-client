import gql from 'graphql-tag';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import ChecklistItem from '../ChecklistItem/ChecklistItem';

const GET_CHECKLIST = gql`
  query gettopics($id: ID!) {
    topics(TopicId: $id) {
      checklist {
        id
        title
        completed
      }
    }
  }
`;

const CREATE_CHECKLIST_ITEM = gql`
  mutation createChecklistItem($TopicId: ID! $title: String!) {
    createChecklistItem(TopicId: $TopicId, title: $title) {
      id
      title
      completed
    }
  }
`;

const UPDATE_CHECKLIST_ITEM = gql`
  mutation updateChecklistItem($id: ID! $title: String $completed: Boolean) {
    updateChecklistItem(id: $id, title: $title, completed: $completed) {
      id
      title
      completed
    }
  }
`;

const DELETE_CHECKLIST_ITEM = gql`
  mutation deleteChecklistItem($id: ID!) {
    deleteChecklistItem(id: $id)
  }
`;

interface ChecklistProps {
  selectedTopicId: string
}

const Checklist: React.FC<ChecklistProps> = ({ selectedTopicId }) => {
  const { data, loading, refetch } = useQuery(GET_CHECKLIST, {
    variables: { id: selectedTopicId },
  });
  const [newChecklistItemInput, setNewChecklistItemInput] = useState('');

  const [createChecklistItem] = useMutation(CREATE_CHECKLIST_ITEM);
  const [deleteChecklistItem] = useMutation(DELETE_CHECKLIST_ITEM);
  const [updateChecklistItem] = useMutation(UPDATE_CHECKLIST_ITEM);

  if (loading) return null;
  if (!data) return null;

  const handleCreateChecklistItem = async () => {
    try {
      if (newChecklistItemInput === '') return;
      await createChecklistItem({
        variables: { TopicId: selectedTopicId, title: newChecklistItemInput },
      });
      setNewChecklistItemInput('');
      refetch();
      return;
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
    }
  };

  const handleUpdateChecklistItem = async (checklistItemId: string, checklistItemTitle: string) => {
    try {
      await updateChecklistItem({
        variables: { id: checklistItemId, title: checklistItemTitle },
      });
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
    }
  };

  const handleDeleteChecklistItem = async (checklistItemId: string) => {
    try {
      await deleteChecklistItem({ variables: { id: checklistItemId } });
      refetch();
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewChecklistItemInput(e.target.value);
  };

  const handleChecked = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await updateChecklistItem({
        variables: { id: e.target.id, completed: e.target.checked },
      });
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
    }
  };

  // creating the list
  const { checklist } = data.topics[0];
  const checklistItems = checklist.map((checklistItem: any) => (
    <ChecklistItem
      key={checklistItem.id}
      checklistItem={checklistItem}
      handleChecked={handleChecked}
      handleDeleteChecklistItem={handleDeleteChecklistItem}
      handleUpdateChecklistItem={handleUpdateChecklistItem}
    />
  ));

  return (
    <div>
      <h3>Checklist</h3>
      <input type="text" name="newChecklistItem" value={newChecklistItemInput} onChange={handleChange} />
      <button type="button" onClick={handleCreateChecklistItem}>Add Item</button>
      {checklistItems}
    </div>
  );
};


Checklist.propTypes = {
  selectedTopicId: PropTypes.string.isRequired,
};
export default Checklist;
