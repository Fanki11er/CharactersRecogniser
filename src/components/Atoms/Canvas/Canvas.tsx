import { useEffect, useRef, useState } from 'react';
import { CanvasWrapper, Wrapper } from './Canvas.styles';
import CanvasDraw from 'react-canvas-draw';
import { Character, ComposedElement, NormalizedCharacter } from '../../../Interfaces/interfaces';
import { DefaultButton } from '../Buttons/Buttons';
import Brain from '../../Organisms/Brain/Brain';

const Canvas = () => {
  const canvasRev = useRef<CanvasDraw>(null);
  const [characters, setCharacter] = useState<Character[]>([]);
  const [canvas, setCanvas] = useState<CanvasDraw | null>(null);
  const [normalizedCharacters, setNormalizedCharacters] = useState<NormalizedCharacter[]>([]);
  const [composedElements, setComposedElements] = useState<ComposedElement[]>([]);

  useEffect(() => {
    if (canvasRev) {
      const canvas = canvasRev.current;
      setCanvas(canvas);
    }
  }, [canvasRev]);

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
    resetCanvas(canvas);
  };

  const extractData = () => {
    const elements = [] as any[];
    characters.map((character) => {
      const characterObj = JSON.parse(character.content);
      for (let i = 0; i < characterObj.lines.length; i++) {
        elements.push(characterObj.lines[i].points);
      }
      setComposedElements([
        ...composedElements,
        {
          type: character.whatItIs,
          content: elements.flat(),
        },
      ]);
    });
  };

  const normalizeData = (composedElements: ComposedElement[]) => {
    console.log(composedElements);
    for (let i = 0; i < composedElements.length; i++) {
      const array = Array(45);
      array.fill(Array(38).fill(0));

      for (let j = 0; j < composedElements[i].content.length; j++) {
        let x = Number.parseInt((composedElements[i].content[j].x / 4).toFixed(0));
        let y = Number.parseInt((composedElements[i].content[j].y / 4).toFixed(0));

        array[x][y] = 1;
      }
      console.log(console.log(array.flat()));
      setNormalizedCharacters([
        ...normalizedCharacters,
        {
          type: composedElements[i].type,
          content: array.flat(),
        },
      ]);
      setTimeout(() => {
        console.log(normalizedCharacters);
      }, 5000);
    }
  };

  useEffect(() => {
    composedElements.length > 0 && normalizeData(composedElements);
  }, [composedElements]);

  return (
    <Wrapper>
      <CanvasWrapper>
        <CanvasDraw canvasHeight={180} canvasWidth={150} brushRadius={4} hideGrid={true} ref={canvasRev} />
      </CanvasWrapper>
      <DefaultButton onClick={() => canvas && getData(canvas, 'A')}>Get Data</DefaultButton>
      <DefaultButton onClick={() => canvas && resetCanvas(canvas)}>Reset Canvas</DefaultButton>
      <DefaultButton onClick={() => extractData()}>Extract data</DefaultButton>
      <Brain />
    </Wrapper>
  );
};

// <DefaultButton>Extract data</DefaultButton>
/*

*/

export default Canvas;

/**
 <div>
        {normalizedCharacters.map((character) => {
          return (
            <>
              <span>{`${JSON.stringify(character)}`}</span>
              <br />
              <br />
            </>
          );
        })}
      </div>
        <DefaultButton onClick={() => workWithData()}>Normalize</DefaultButton>
 */

