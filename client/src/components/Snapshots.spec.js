/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// use jest --updateSnapshot --'testNamePattern' to re-record snapshot of particular test

import React from 'react';
import { shallow } from 'enzyme';
import CalendarWrapper from './CalendarWrapper.jsx';

describe('Calendar Wrapper', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<CalendarWrapper debug />);

    expect(component).toMatchSnapshot();
  });
});
