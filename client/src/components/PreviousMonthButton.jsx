import styled from 'styled-components';
import React from 'react';

const PreviousMonthArrow = styled.svg`
   height: 24px;
   width: 24px;
`;

const PreviousMonthSpan = styled.span`
  position: absolute;
  left: 12px;
  top: 18px;
  user-select: none;
`;

const PreviousMonthButton = (props) => (
  <PreviousMonthSpan>
      <PreviousMonthArrow onClick={props.onClick} xmlns='http://www.w3.org/2000/svg'>
        <path d='M14.475 18.364l1.414-1.414L10.94 12l4.95-4.95-1.415-1.414L8.11 12l6.365 6.364z'></path>
      </PreviousMonthArrow>
  </PreviousMonthSpan>
);

export default PreviousMonthButton;
