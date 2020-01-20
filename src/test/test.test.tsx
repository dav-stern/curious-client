import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

import {
  configure, shallow, mount, render,
} from 'enzyme';


import ChecklistItem from '../components/ChecklistItem/ChecklistItem';

configure({ adapter: new Adapter() });


describe('My first test suite!', () => {
  const fn = () => '';
  it('correctly renders', () => {
    const wrapper = shallow(<ChecklistItem checklistItem={{ id: '1', completed: false, title: 'hello' }} handleChecked={fn} onChange={fn} handleDeleteChecklistItem={fn} handleUpdateChecklistItem={fn} />);
    expect(wrapper).toMatchSnapshot();
  });
});
