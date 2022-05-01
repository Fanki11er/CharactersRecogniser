import { useEffect, useRef, useState } from 'react';
import { CanvasWrapper, Wrapper } from './Canvas.styles';
import CanvasDraw from 'react-canvas-draw';
import { Character, ComposedElement, NormalizedCharacter } from '../../../Interfaces/interfaces';
import { DefaultButton } from '../Buttons/Buttons';
import Brain from '../../Organisms/Brain/Brain';
import { database } from '../../../Firebase/firebase';
import { child, get, push, ref, set } from 'firebase/database';
import NumberSelectionMenu from '../../Molecules/NumberSelectMenu/NumberSelectMenu';
const Canvas = () => {
  const canvasRev = useRef<CanvasDraw>(null);
  //const [characters, setCharacter] = useState<Character[]>([]);
  const [canvas, setCanvas] = useState<CanvasDraw | null>(null);
  const [normalizedCharacter, setNormalizedCharacter] = useState<NormalizedCharacter>();
  const [selectValue, setSelectValue] = useState('0');
  //const [composedElements, setComposedElements] = useState<ComposedElement[]>([]);

  /*const testDb = async () => {
    console.log('RUN');
    const dbReference = ref(database, '/Numbers');
    set(dbReference, {
      '1': [12],
      '2': [1],
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    //const newPostKey = push(child(ref(database), 'Numbers')).key;
    //console.log(newPostKey);

    get(child(dbReference, `/Hello`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };*/
  //---------------------------------------------------------------------------
  useEffect(() => {
    if (canvasRev) {
      const canvas = canvasRev.current;
      setCanvas(canvas);
    }
  }, [canvasRev]);

  const resetCanvas = (canvas: CanvasDraw) => {
    canvas.clear();
  };

  const getData = (canvas: CanvasDraw, characterType: string): Character => {
    return {
      whatItIs: characterType,
      content: canvas.getSaveData(),
    };
  };

  const extractData = (character: Character): ComposedElement => {
    const elements = [] as any[];

    const characterObj = JSON.parse(character.content);
    for (let i = 0; i < characterObj.lines.length; i++) {
      elements.push(characterObj.lines[i].points);
    }

    return {
      type: character.whatItIs,
      content: elements.flat(),
    };
  };

  const normalizeData = (composedElements: ComposedElement) => {
    const array = Array(38);
    array.fill(Array(45).fill(0));

    for (let i = 0; i < composedElements.content.length; i++) {
      let x = Number.parseInt((composedElements.content[i].x / 4).toFixed(0));
      let y = Number.parseInt((composedElements.content[i].y / 4).toFixed(0));

      array[x][y] = 1;
    }
    setNormalizedCharacter({
      type: composedElements.type,
      content: array.flat(),
    });
  };

  const getCharacter = () => {
    if (canvas) {
      const character = getData(canvas, selectValue);
      const extractedCharacter = extractData(character);
      normalizeData(extractedCharacter);
      resetCanvas(canvas);
    }
  };
  useEffect(() => {
    console.log('CHAR ', normalizedCharacter);
  }, [normalizedCharacter]);

  const selectType = (type: string) => {
    setSelectValue(type);
  };

  const sendCharacter = async (character: NormalizedCharacter) => {
    const dbReference = ref(database, '/Numbers');

    push(child(dbReference, `/${character.type}`), character);
  };
  /*if()
    const dbReference = ref(database, '/Numbers');
    set(dbReference, {
      '1': [12],
      '2': [1],
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });*/

  return (
    <Wrapper>
      <CanvasWrapper>
        <CanvasDraw canvasHeight={180} canvasWidth={150} brushRadius={4} hideGrid={true} ref={canvasRev} />
      </CanvasWrapper>
      <DefaultButton onClick={() => canvas && getCharacter()}>Get Data</DefaultButton>
      <DefaultButton onClick={() => canvas && resetCanvas(canvas)}>Reset Canvas</DefaultButton>
      <DefaultButton onClick={() => sendCharacter(normalizedCharacter!)}>DB</DefaultButton>
      <NumberSelectionMenu select={selectType} />
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
         <DefaultButton onClick={() => testDb()}>Test</DefaultButton>
       
      <DefaultButton onClick={() => extractData()}>Extract data</DefaultButton>

          
 */

/*
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
*/

