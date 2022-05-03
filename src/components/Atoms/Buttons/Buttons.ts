import styled from 'styled-components';

export const DefaultButton = styled.button`
  width: 150px;
  height: 40px;
  border: 2px solid red;
  border-radius: 15px;
`;

export const DisabledButton = styled(DefaultButton)`
  background-color: gray;
  pointer-events: none;
`;

