import { Menu, SelectNumberMenuWrapper, StyledOption } from './NumberSelectMenu.styles';

interface Props {
  select: (selection: string) => void;
  defaultValue: string;
}
const NumberSelectionMenu = (props: Props) => {
  const { select, defaultValue } = props;
  return (
    <SelectNumberMenuWrapper>
      <Menu onChange={(e) => select(e.target.value)} value={defaultValue}>
        <StyledOption value={'X'}>X</StyledOption>
        <StyledOption value={'0'}>0</StyledOption>
        <StyledOption value={'1'}>1</StyledOption>
        <StyledOption value={'2'}>2</StyledOption>
        <StyledOption value={'3'}>3</StyledOption>
        <StyledOption value={'4'}>4</StyledOption>
        <StyledOption value={'5'}>5</StyledOption>
        <StyledOption value={'6'}>6</StyledOption>
        <StyledOption value={'7'}>7</StyledOption>
        <StyledOption value={'8'}>8</StyledOption>
        <StyledOption value={'9'}>9</StyledOption>
      </Menu>
    </SelectNumberMenuWrapper>
  );
};

export default NumberSelectionMenu;

