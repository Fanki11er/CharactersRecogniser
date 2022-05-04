import styled from 'styled-components';

interface StyledProps {
  isWorking: boolean;
}

export const BrainWrapper = styled.div`
  width: 1000px;
  height: fit-content;
  border: 3px solid black;
  grid-column: 1 / span 2;
  grid-row: 2 / span 1;
  border-radius: 15px;
  display: grid;
  grid-row-gap: 5px;
  grid-template-rows: 50px 110px 110px;
  grid-template-columns: 100%;
  padding: 15px;
`;

export const Menu = styled.div`
  width: 150px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  grid-column: 2 / span 1;
  grid-row: 1 / span 3;
`;

export const Title = styled.h3`
  width: fit-content;
  height: 100%;
  margin: 0;
  padding: 1px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LearnSection = styled.section`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 220px 1fr 320px;
  grid-template-rows: 50px 1fr;
  border: 2px solid black;
  border-radius: 10px;
  padding: 0 20px;
  position: relative;
`;

export const WorkingStatus = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props: StyledProps) => (props.isWorking ? 'green' : 'gray')};
  transition: all 0.5s;
  align-self: center;
  justify-self: flex-start;
  margin: 0 10px;
  position: absolute;
  left: -8px;
  top: 2px;
`;

export const LoadedCharacters = styled.span`
  width: 200px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-row: 2 / span 1;
  border: 2px solid black;
  border-radius: 10px;
  grid-column: 1 / span 1;
`;

export const LearningProgress = styled.div`
  display: flex;
  justify-content: space-between;
  width: 370px;
  height: 40px;
  grid-row: 2 / span 1;
  grid-column: 2 / span 1;
`;

export const SectionHeader = styled.h4`
  width: fit-content;
  height: 100%;
  margin: 0;
  padding: 1px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: flex-start;
`;

export const LearnSectionMenu = styled.div`
  width: 100%;
  height: 100%;
  grid-row: 2 / span 1;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`;

export const ProgressInfo = styled.span`
  width: 170px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  border-radius: 10px;
`;

export const TestSection = styled(LearnSection)`
  grid-row: 2 / span 1;
  grid-template-rows: 30px 30px;
  margin-top: 15px;
`;

export const TestSectionMenu = styled.div`
  width: 100%;
  height: 40px;
  grid-row: 2 / span 1;
  grid-column: 3 / span 1;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`;

