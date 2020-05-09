import styled from 'styled-components';
import React from 'react';
import MonthSelector from './MonthSelector.jsx';
import CalendarTable from './CalendarTable.jsx';

const CalendarWrapper = styled.div`
  border: 0;
  display: ${(props) => (props.displayed ? 'inline-block' : 'none')};
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 18px rgba(0, 0, 0, .15);
  min-width: 312px;
  border: 1px solid #ccc;
  position: absolute;
  top: 113px;
  left: 24px;
  z-index: 1;
`;

const Calendar = (props) => (
  <CalendarWrapper onClick={props.calendarMethods.showCalendar}
  displayed={props.state.displayCalendar}>
    <MonthSelector state={props.state} calendarMethods={props.calendarMethods}/>
    <CalendarTable state={props.state} calendarMethods={props.calendarMethods}/>
  </CalendarWrapper>
);

export default Calendar;
