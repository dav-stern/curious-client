import React from 'react';
import PropTypes from 'prop-types';

interface IChecklist {
  id: string
  title: string
  completed: boolean
  __typename: string
}

interface ChecklistProps {
  checklist: IChecklist[]
  handleCreateChecklistItem: () => void
  handleDeleteChecklistItem: (checklistItemId: string) => void
}

// function to handle updating items
// const handleCheck = (e: any) => {
//   const { id } = e.target;
//   const title = e.target.value;
//   const item = { id, title };
//   console.log(item);
// };

const Checklist: React.FC<ChecklistProps> = ({
  checklist,
  handleCreateChecklistItem,
  handleDeleteChecklistItem,
}) => {
  // creating the list
  const checklistItems = checklist.map((checklistItem) => (
    <div key={checklistItem.id}>
      <input type="checkbox" id={checklistItem.id} value={checklistItem.title} />
      <label htmlFor={checklistItem.title}>{checklistItem.title}</label>
      <button type="button" onClick={() => handleDeleteChecklistItem(checklistItem.id)}><span>x</span></button>
    </div>
  ));

  return (
    <fieldset>
      <h3>Checklist</h3>
      <button type="button" onClick={handleCreateChecklistItem}>Add Item</button>
      {checklistItems}
    </fieldset>
  );
};

Checklist.propTypes = {
  checklist: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    __typename: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  handleCreateChecklistItem: PropTypes.func.isRequired,
  handleDeleteChecklistItem: PropTypes.func.isRequired,
};
export default Checklist;
