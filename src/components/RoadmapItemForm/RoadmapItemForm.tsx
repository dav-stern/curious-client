import React from 'react';
import './RoadmapItemForm.css';
import PropTypes from 'prop-types';

interface RoadmapItemFormProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleSelection: (e:React.ChangeEvent<HTMLSelectElement>) => void,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  titleInput: string,
}

const RoadmapItemForm: React.FC<RoadmapItemFormProps> = ({
  handleChange, handleSelection, handleSubmit, titleInput,
}) => (
  <form id="roadmap-form" onSubmit={handleSubmit}>
    <input
      type="text"
      name="name"
      onChange={handleChange}
      value={titleInput}
      required
    />
    <select name="categories" form="roadmap-form" onChange={handleSelection} required>
      <option value="IT">IT</option>
      <option value="Music">Music</option>
      <option value="Sports">Sports</option>
    </select>
    <button type="submit">ADD</button>
  </form>
);

RoadmapItemForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleSelection: PropTypes.func.isRequired,
  titleInput: PropTypes.string.isRequired,
};

export default RoadmapItemForm;
