import styled from 'styled-components';

const CalendarDate = styled.td`
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
`;

export default CalendarDate;
