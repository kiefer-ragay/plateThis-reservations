import React from 'react';
// import styled from 'styled-components';
import ReservationWrapper from './ReservationWrapper.jsx';
import ReservationHeader from './ReservationHeader.jsx';
import CalendarDropdownButton from './CalendarDropdownButton.jsx';
import DropdownContainer from './DropdownContainer.jsx';
import FindTableButton from './FindTableButton.jsx';


const ReservationBox = (props) => (
  <ReservationWrapper>
    <ReservationHeader/>
    <CalendarDropdownButton/>
    <DropdownContainer/>
    <FindTableButton>Find a Table</FindTableButton>
  </ReservationWrapper>
);

export default ReservationBox;
