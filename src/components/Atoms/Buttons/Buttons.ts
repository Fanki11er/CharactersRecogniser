import styled from 'styled-components';
import { ThemeProps } from '../../../Theme/theme';

export const DefaultButton = styled.button`
  width: 150px;
  height: 40px;
  background-image: linear-gradient(135deg, rgba(253, 124, 1, 1), rgba(236, 176, 28, 1));
  border-radius: 15px;
  color: white;
  font-weight: bold ;

   :hover{
    cursor: pointer;
    border: 3px solid ${(props: ThemeProps)=>props.theme.colors.fontColorRequiredCharacterRedStart};
    transition: all 0.5s ;
    box-shadow: 0 0 3px 3px ${(props: ThemeProps)=>props.theme.colors.fontColorRequiredCharacterRedGradientEnd};
   }
`;
export const DisabledButton = styled(DefaultButton)`
  background-image: linear-gradient(90deg, rgba(173, 173, 173, 1), rgba(237, 237 ,237, 1));
  pointer-events: none;
`;

