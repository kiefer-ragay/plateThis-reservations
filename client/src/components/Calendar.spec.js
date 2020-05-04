/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar.jsx';

describe('Calendar', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Calendar debug />);

    expect(component).toMatchSnapshot();
  });
});
