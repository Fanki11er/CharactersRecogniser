import styled from 'styled-components';

export const SolutionSectionWrapper = styled.section`
  width: 600px;
  height: 380px;
  display: grid;
  grid-template-rows: 280px 100px;
  margin: 0 15px;
  border-radius: 15px;
  grid-row: 1 / span 1;
  grid-column: 2 / span 1;
  border: 2px solid black;
`;

export const ActionWrapper = styled.div`
  display: grid;
  width: 150px;
  height: 100%;
  justify-content: center;
  align-items: center;
  justify-self: center;
`;

export const Info = styled.span`
  color: orange;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px; ;
`;

export const GraphSection = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
`;

