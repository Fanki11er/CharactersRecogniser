import { Menu, SelectNumberMenuWrapper, StyledOption } from './NumberSelectMenu.styles';

interface Props {
  select: (selection: string) => void;
}
const NumberSelectionMenu = (props: Props) => {
  const { select } = props;
  return (
    <SelectNumberMenuWrapper>
      <Menu onChange={(e) => select(e.target.value)} defaultValue={0}>
        <StyledOption value={'0'}>0</StyledOption>
        <StyledOption value={'1'}>1</StyledOption>
        <StyledOption value={'2'}>2</StyledOption>
      </Menu>
    </SelectNumberMenuWrapper>
  );
};

export default NumberSelectionMenu;

