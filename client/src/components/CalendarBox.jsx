import React from 'react';
import MonthSelector from './MonthSelector.jsx';
import CalendarTable from './CalendarTable.jsx';

const CalendarBox = (props) => (
  <CalendarWrapper displayed={props.state.displayCalendar}>
    <MonthSelector state={props.state} calendarMethods={props.calendarMethods}/>
    <CalendarTable state={props.state} calendarMethods={props.calendarMethods}/>
  </CalendarWrapper>
);

export default CalendarBox;
