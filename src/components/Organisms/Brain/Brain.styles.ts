import styled from 'styled-components';

export const BrainWrapper = styled.div`
  width: 100%;
  height: 100%auto;
  border: 3px solid black;
  grid-column: 1 / span 1;
  grid-row: 2 / span 1;
  border-radius: 15px;
  display: grid;
  grid-template-columns: 1fr 160px;
  grid-auto-rows: 1fr;
  padding: 15px;
`;

export const Menu = styled.div`
  width: 150px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  grid-column: 2 / span 1;
`;

