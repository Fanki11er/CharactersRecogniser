import { createContext, PropsWithChildren, useState } from 'react';
import { NormalizedCharacter } from '../Interfaces/interfaces';

interface Context {
  normalizedCharacter: NormalizedCharacter | null;
  solution: number[];
  wantSolution: boolean;
  setCharacter: (character: NormalizedCharacter) => void;
  checkWhatNumberItIs: (object: any) => void;
  getSolution: () => void;
}

export const CanvasContext = createContext<Context>({
  normalizedCharacter: null,
  solution: [],
  wantSolution: false,
  setCharacter: () => {},
  checkWhatNumberItIs: (object: any) => {},
  getSolution: () => {},
});

const NormalizedDataProvider = (props: PropsWithChildren<any>) => {
  const [normalizedCharacter, setNormalizedCharacter] = useState<NormalizedCharacter | null>(null);
  const [solution, setSolution] = useState<number[]>([]);
  const [wantSolution, setWantSolution] = useState(false);

  const setCharacter = (character: NormalizedCharacter) => {
    setNormalizedCharacter(character);
  };

  const getProperties = (object: any) => {
    console.log(object, 'RAW');
    setWantSolution(false);
    const resultArray = Array(10).fill(0);
    for (let property in object) {
      resultArray[Number.parseInt(property)] = object[property];
      console.log(resultArray, 'ARRAY');
    }
    return resultArray as number[];
  };

  const getSolution = () => {
    setWantSolution(true);
  };

  const checkWhatNumberItIs = (object: any) => {
    setSolution(getProperties(object));
    setWantSolution(false);
  };

  const context = {
    normalizedCharacter,
    setCharacter,
    solution,
    wantSolution,
    checkWhatNumberItIs,
    getSolution,
  };

  return <CanvasContext.Provider value={context}>{props.children}</CanvasContext.Provider>;
};

export default NormalizedDataProvider;
