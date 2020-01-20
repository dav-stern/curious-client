import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

import { configure, shallow } from 'enzyme';


import ChecklistItem from '../components/ChecklistItem/ChecklistItem';

configure({ adapter: new Adapter() });

describe('My first test suite!', () => {
  const fn:Function = () => '';
  it('correctly renders', () => {
    const wrapper = shallow(<ChecklistItem checklistItem={{ id: '1', completed: false, title: 'hello' }} handleChecked={fn} handleDeleteChecklistItem={fn} handleUpdateChecklistItem={fn} />);
    expect(wrapper).toMatchSnapshot();
  });
});
