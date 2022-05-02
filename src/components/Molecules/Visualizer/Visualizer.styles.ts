import styled from 'styled-components';

export const VisualizerWrapper = styled.div`
  display: grid;
  width: fit-content;
  height: fit-content;
  grid-column: 3 / span 1;
  grid-row: 1 / span 1;
  grid-template-columns: repeat(10, 5px);
  grid-template-rows: repeat(16, 5px);
  border: 3px solid gray;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  align-self: center;
  justify-self: center;
`;

export const EmptyPixel = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

export const FilledPixel = styled(EmptyPixel)`
  background-color: black;
`;
