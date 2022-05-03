import styled from 'styled-components';

export const SelectNumberMenuWrapper = styled.div`
  width: 60px;
  height: 60px;
  border: 3px solid green;
  display: flex;
  align-items: center ;
  justify-content: center ;
  align-self: center ;
justify-self: flex-start;
`;

export const Menu = styled.select`
display: flex;
grid-column: 2 / span 1 ;
grid-row: 1 span / 1 ;
  background-color: gray;
  width: 50px;
  font-size: 2.5rem;
  height: 50px;
  align-items: center;
  justify-content: center;
  text-align: center ;
`;

export const StyledOption = styled.option`
  width: 100%;
`;

