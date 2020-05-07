import styled from 'styled-components';
import calendarHelpers from '../calendarHelpers.js';
import React from 'react';

const CalendarDateCell = styled.td`
  width: 30px;
  height: 30px;
  border: 3.5px solid white;
  border-radius: 50%;
  text-align: center;
  cursor: default;
  :hover {
    background: #f0f3f8;
    cursor: pointer;
  }
  pointer-events: ${props => props.past ? 'none' : 'auto'}
`;

const CalendarDate = (props) => (
  <CalendarDateCell id={calendarHelpers.createId(props.dayObj.yr,
    props.dayObj.mo, props.dayObj.day)} past={props.past}>{props.dayObj.day}
  </CalendarDateCell>
);

export default CalendarDate;
