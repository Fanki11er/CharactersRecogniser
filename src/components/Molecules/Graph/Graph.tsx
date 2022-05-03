import { useEffect, useState } from 'react';
import { Bottom, GraphColumn, GraphWrapper, Scale } from './Graph.styles';
interface Props {
  numbers: number[];
}
const Graph = (props: Props) => {
  const { numbers } = props;

  const [solution, setSolution] = useState(-1);

  const findSolution = (numbers: number[]) => {
    let max = 0;
    let index = 0;

    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] > max) {
        max = numbers[i];
        index = i;
      }
      setSolution(index);
    }
  };

  useEffect(() => {
    findSolution(numbers);
  }, [numbers]);

  const transform = (value: number) => {
    return `${value * 100}%`;
  };
  return (
    <GraphWrapper>
      <GraphColumn heightOf={transform(numbers[0])} solution={solution === 0 ? true : false} />
      <GraphColumn heightOf={transform(numbers[1])} solution={solution === 1 ? true : false} />
      <GraphColumn heightOf={transform(numbers[2])} solution={solution === 2 ? true : false} />
      <GraphColumn heightOf={transform(numbers[3])} solution={solution === 3 ? true : false} />
      <GraphColumn heightOf={transform(numbers[4])} solution={solution === 4 ? true : false} />
      <GraphColumn heightOf={transform(numbers[5])} solution={solution === 5 ? true : false} />
      <GraphColumn heightOf={transform(numbers[6])} solution={solution === 6 ? true : false} />
      <GraphColumn heightOf={transform(numbers[7])} solution={solution === 7 ? true : false} />
      <GraphColumn heightOf={transform(numbers[8])} solution={solution === 8 ? true : false} />
      <GraphColumn heightOf={transform(numbers[9])} solution={solution === 9 ? true : false} />
      <Scale>0</Scale>
      <Scale>1</Scale>
      <Scale>2</Scale>
      <Scale>3</Scale>
      <Scale>4</Scale>
      <Scale>5</Scale>
      <Scale>6</Scale>
      <Scale>7</Scale>
      <Scale>8</Scale>
      <Scale>9</Scale>
      <Bottom />
    </GraphWrapper>
  );
};

export default Graph;

