import { useContext } from 'react';
import { CanvasContext } from '../../../Providers/NormalizedDataProvider';
import { DefaultButton, DisabledButton } from '../../Atoms/Buttons/Buttons';
import Graph from '../Graph/Graph';
import { ActionWrapper, GraphSection, Info, SolutionSectionWrapper } from './SolutionSection.styles';

const SolutionSection = () => {
  const { getSolution, solution, normalizedCharacter } = useContext(CanvasContext);
  return (
    <SolutionSectionWrapper>
      <GraphSection>
        <Graph numbers={solution} />
      </GraphSection>
      <ActionWrapper>
        {normalizedCharacter ? <Info>Test Me</Info> : <Info>Character required</Info>}
        {normalizedCharacter ? (
          <DefaultButton onClick={() => getSolution()}>Get solution</DefaultButton>
        ) : (
          <DisabledButton>Get solution</DisabledButton>
        )}
      </ActionWrapper>
    </SolutionSectionWrapper>
  );
};

export default SolutionSection;

