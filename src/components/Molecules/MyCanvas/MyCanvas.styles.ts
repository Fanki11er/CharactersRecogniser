import styled from 'styled-components';
import { ReactSketchCanvas } from 'react-sketch-canvas';

export const MyCanvasWrapper = styled.div`
  width: 100%;
  max-width: 1vw;
  height: 100%;
  display: grid;
  grid-template-columns: 900px 1fr;
  grid-template-rows: 400px 300px;
  margin: 25px;
`;

export const CanvasSection = styled.section`
  padding: 20px;
  width: 400px;
  height: 380px;
  border: 2px solid overscroll-behavior-block;
  display: grid;
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  grid-template-columns: 200px 100px 1fr;
  grid-template-rows: 160px 1fr;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  border-radius: 15px;
  position: relative;
`;

export const CanvasButtonsWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 100%;
  grid-column: 1 / span 1;
  grid-row: 2 / span 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around; ;
`;

export const Canvas = styled(ReactSketchCanvas)`
  border: 2px solid red;
  width: 100px;
  height: 160px;
  border: 4px solid blue;
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  align-self: center;
  justify-self: center;
`;

export const StatusInfo = styled.div`
  width: fit-content;
  min-width: 100px;
  padding: 2px 10px;
  height: 40px;
  background-color: lightgreen;
  border: 2px solid darkolivegreen;
  border-radius: 10px;
  position: absolute;
  bottom: 25px;
  left: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(100%);
`;

export const StatusErrorInfo = styled(StatusInfo)`
  border: 2px solid darkred;
  background-color: pink;
`;

