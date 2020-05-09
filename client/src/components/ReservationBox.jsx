import React from 'react';
// import styled from 'styled-components';
import ReservationWrapper from './ReservationWrapper.jsx';
import ReservationHeader from './ReservationHeader.jsx';
import CalendarDropdownButton from './CalendarDropdownButton.jsx';
import DropdownContainer from './DropdownContainer.jsx';
import FindTableButton from './FindTableButton.jsx';
import Calendar from './Calendar.jsx';

const ReservationBox = (props) => (
  <ReservationWrapper>
    <Calendar state={props.state} calendarMethods={props.calendarMethods}/>
    <ReservationHeader/>
    <CalendarDropdownButton showCalendar={props.calendarMethods.showCalendar}
    longDate={props.state.longDate} calendarMethods={props.calendarMethods}>
    </CalendarDropdownButton>
    <DropdownContainer setPartySize={props.calendarMethods.setPartySize}
    timeslots={props.state.timeslots} weekdayIndex={props.state.selectedWeekdayIndex}/>
    <FindTableButton>Find a Table</FindTableButton>
  </ReservationWrapper>
);

export default ReservationBox;
