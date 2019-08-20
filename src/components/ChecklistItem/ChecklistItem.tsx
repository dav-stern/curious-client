import React, { useState } from 'react';
import PropTypes from 'prop-types';

interface IchecklistItem {
  id: string
  title: string
  completed: boolean
}

interface ChecklistItemProps {
  checklistItem: IchecklistItem
  checklistTitleInput: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleChecked: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleDeleteChecklistItem: (checklistItemId: string) => void
  handleUpdateChecklistItem: (checklistItemId: string) => void
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({
  checklistItem,
  checklistTitleInput,
  handleChange,
  handleChecked,
  handleDeleteChecklistItem,
  handleUpdateChecklistItem,
}) => {
  const [editing, setEditing] = useState(false);

  const handleEditing = () => {
    setEditing(!editing);
  };

  const handleUpdateButton = () => {
    handleUpdateChecklistItem(checklistItem.id);
    handleEditing();
  };

  const handleDeleteButton = () => {
    handleDeleteChecklistItem(checklistItem.id);
    handleEditing();
  };

  return (
    <div>
      {editing
        ? (
          <div>
            <input type="text" value={checklistTitleInput} onChange={handleChange} />
            <button type="button" onClick={() => handleUpdateButton()}>Save Changes</button>
            <button type="button" onClick={() => handleDeleteButton()}><span>x</span></button>
          </div>
        )
        : (
          <div>
            <input type="checkbox" id={checklistItem.id} checked={checklistItem.completed} onChange={handleChecked} />
            <label htmlFor={checklistItem.id} onClick={handleEditing}>{checklistItem.title}</label>
          </div>
        )}
    </div>
  );
};

ChecklistItem.propTypes = {
  checklistItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  checklistTitleInput: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleChecked: PropTypes.func.isRequired,
  handleDeleteChecklistItem: PropTypes.func.isRequired,
  handleUpdateChecklistItem: PropTypes.func.isRequired,

};
export default ChecklistItem;
