import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import AuthForm from '../components/AuthForm/AuthForm';

configure({ adapter: new Adapter() });


describe('Input should be rendered as declared', () => {
  const mockFn = () => ('');
  const params = {
    inputs: {
      input1: {
        type: 'text',
        name: 'test',
        key: 'a',
        onChange: mockFn,
        value: '',
        required: 1,

      },
    },
    email: '',
    password: '',
  };
  const wrapper = shallow(<AuthForm inputs={params} handleSubmit={mockFn} handleChange={mockFn} errorMsg="str" />);
  it('should have the same number of inputs', () => {
    expect(wrapper.find('input')).toHaveLength(3);
  });
  it('should have the properties as declared', () => {
    expect(wrapper.find('input').at(0).props().value).toEqual(params.inputs);
  });
  it('should have an email field', () => {
    expect(wrapper.find('input').at(1).props().name).toEqual('email');
  });
  it('should have an password field', () => {
    expect(wrapper.find('input').at(2).props().name).toEqual('password');
  });
});
