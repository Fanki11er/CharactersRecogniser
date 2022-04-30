import { useEffect, useRef, useState } from 'react';
import { CanvasWrapper, Wrapper } from './Canvas.styles';
import CanvasDraw from 'react-canvas-draw';
import { Character, NormalizedCharacter } from '../../../Interfeces/interfaces';
import { DefaultButton } from '../Buttons/Buttons';

const Canvas = () => {
  const canvasRev = useRef<CanvasDraw>(null);
  const [characters, setCharacter] = useState<Character[]>([]);
  const [canvas, setCanvas] = useState<CanvasDraw | null>(null);
  const [normalizedCharacters, setNormalizedCharacters] = useState<NormalizedCharacter[]>([]);

  useEffect(() => {
    if (canvasRev) {
      const canvas = canvasRev.current;
      setCanvas(canvas);
    }
  }, []);

  const resetCanvas = (canvas: CanvasDraw) => {
    canvas.clear();
  };
  const getData = (canvas: CanvasDraw, characterType: string) => {
    setCharacter([
      ...characters,
      {
        whatItIs: characterType,
        content: canvas.getSaveData(),
      },
    ]);
  };

  const extractData = () => {
    const normalizedElements = [] as any[];
    characters.map((character) => {
      const characterObj = JSON.parse(character.content);
      for (let i = 0; i < characterObj.lines.length; i++) {
        normalizedElements.push(characterObj.lines[i].points);
      }
      setNormalizedCharacters([
        ...normalizedCharacters,
        {
          type: character.whatItIs,
          content: normalizedElements.flat(),
        },
      ]);
    });
  };

  return (
    <Wrapper>
      <CanvasWrapper>
        <CanvasDraw canvasHeight={295} canvasWidth={295} brushRadius={5} hideGrid={true} ref={canvasRev} />
      </CanvasWrapper>
      <DefaultButton onClick={() => canvas && getData(canvas, 'A')}>Get Data</DefaultButton>
      <DefaultButton onClick={() => canvas && resetCanvas(canvas)}>Reset Canvas</DefaultButton>
      <DefaultButton onClick={() => extractData()}>Extract data</DefaultButton>
      <div>
        {normalizedCharacters.map((character) => {
          return <span>{JSON.stringify(character)}</span>;
        })}
      </div>
    </Wrapper>
  );
};

// <DefaultButton>Extract data</DefaultButton>
/*

*/

export default Canvas;

