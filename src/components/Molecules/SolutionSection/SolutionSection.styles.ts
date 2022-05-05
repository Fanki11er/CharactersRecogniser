import styled from 'styled-components';
import { ThemeProps } from '../../../Theme/theme';


export const SolutionSectionWrapper = styled.section`
  width: 600px;
  height: 380px;
  display: grid;
  grid-template-rows: 280px 100px;
  margin: 0 15px;
  border-radius: 15px;
  grid-row: 1 / span 1;
  grid-column: 2 / span 1;
  border: 3px solid ${(props: ThemeProps)=>props.theme.colors.frameBlue};
  background-image: linear-gradient(200deg, rgba(193, 235, 255, 1), rgba(193, 235, 255, 0));
`;

export const ActionWrapper = styled.div`
  display: grid;
  width: 200px;
  height: 100%;
  justify-content: center;
  align-items: center;
  justify-self: center;
`;

export const Info = styled.span`
  color: ${(props: ThemeProps)=>props.theme.colors.fontColorRequiredCharacterRedStart};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold ;
  width: fit-content;
`;

export const GraphSection = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
`;

