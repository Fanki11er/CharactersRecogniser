import styled from 'styled-components';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { ThemeProps } from '../../../Theme/theme';

export const MyCanvasWrapper = styled.div`
  width: 100%;
  max-width: 1vw;
  height: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 400px 1fr;
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
  border: 3px solid ${(props: ThemeProps)=>props.theme.colors.frameBlue};
  border-radius: 15px;
  position: relative;
  background-image: linear-gradient(190deg, rgba(193, 235, 255, 1), rgba(193, 235, 255, 0));
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
  justify-content: space-around; 
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
  left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(-100%);
  animation-name: show;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  transform-origin: 0% 0%;

  @keyframes show {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

export const StatusErrorInfo = styled(StatusInfo)`
  border: 2px solid darkred;
  background-color: pink;
  //color: white;
  //background-image: linear-gradient(200deg, rgba(173, 173, 173, 1), rgba(237, 237 ,237, 1));

`;

