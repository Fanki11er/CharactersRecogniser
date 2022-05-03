import styled from 'styled-components';

interface GraphProps {
  heightOf: string;
  solution?: boolean;
}

export const GraphWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 225px 30px;
  grid-row-gap: 5px;
  grid-template-columns: repeat(10, 1fr);
  grid-column-gap: 15px;
  padding: 15px 15px 0 15px;
`;

export const GraphColumn = styled.div`
  width: 100%;
  height: calc(${(props: GraphProps) => props.heightOf} - 15px);
  border: 1px solid ${(props: GraphProps) => (props.solution ? 'green' : 'orange')};
  transform-origin: 50% 100%;
  display: flex;
  align-self: flex-end;
  grid-row: 1 / span 1;
  background-color: ${(props: GraphProps) => (props.solution ? 'green' : 'orange')};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  //transform: scaleY(1);
  animation-name: solve;
  animation-duration: 6s;
  animation-delay: 8s;
  animation-fill-mode: forwards;
  transition: all 2s 1s;

  @keyframes solve {
    from {
      transform: scaleY(0);
    }
    to {
      transform: scaleY(1);
    }
  }
`;

export const Scale = styled.div`
  width: 100%;
  height: 100%;
  background-color: lightgray;
  grid-row: 2 / span 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

export const Bottom = styled.div`
  width: 100%;
  height: 2px;
  background-color: darkgray;
  position: absolute;
  left: 0;
  bottom: 40px;
`;

