import React, { createContext, PropsWithChildren, useState } from 'react';
import { NormalizedCharacter } from '../Interfaces/interfaces';

interface Context {
  normalizedCharacter: NormalizedCharacter | null;
  setCharacter: (character: NormalizedCharacter) => void;
}

export const CanvasContext = createContext<Context>({
  normalizedCharacter: null,
  setCharacter: () => {},
});

const NormalizedDataProvider = (props: PropsWithChildren<any>) => {
  const [normalizedCharacter, setNormalizedCharacter] = useState<NormalizedCharacter | null>(null);

  const setCharacter = (character: NormalizedCharacter) => {
    setNormalizedCharacter(character);
  };

  const context = {
    normalizedCharacter,
    setCharacter,
  };

  return <CanvasContext.Provider value={context}>{props.children}</CanvasContext.Provider>;
};

export default NormalizedDataProvider;
