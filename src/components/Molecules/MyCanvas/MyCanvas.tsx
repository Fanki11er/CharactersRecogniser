import { useContext, useRef, useState } from 'react';
import { Canvas, CanvasButtonsWrapper, CanvasSection, MyCanvasWrapper, StatusErrorInfo, StatusInfo } from './MyCanvas.styles';
import { NormalizedCharacter } from '../../../Interfaces/interfaces';
import { DefaultButton } from '../../Atoms/Buttons/Buttons';
import Visualization from '../Visualizer/Visualizer';
import NumberSelectionMenu from '../NumberSelectMenu/NumberSelectMenu';
import { child, push, ref } from 'firebase/database';
import { database } from '../../../Firebase/firebase';
import Brain from '../../Organisms/Brain/Brain';
import { CanvasContext } from '../../../Providers/NormalizedDataProvider';
import { ReactSketchCanvasRef, CanvasPath } from 'react-sketch-canvas';
import { firebaseEndPoints } from '../../../Firebase/Endpoints';
import { StatusInfoContext } from '../../../Providers/StatusInfoProvider';
import SolutionSection from '../SolutionSection/SolutionSection';

const MyCanvas = () => {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [character, setCharacter] = useState<NormalizedCharacter | undefined>(undefined);
  const [selectValue, setSelectValue] = useState('X');
  const { setCharacter: setTestCharacter } = useContext(CanvasContext);
  const { statusInfo, changeStatusInfo } = useContext(StatusInfoContext);

  const canvasStyles = {
    border: '4px solid orange',
    borderRadius: '5px',
  };

  const { learnEndpoint, testEndpoint } = firebaseEndPoints;

  const selectType = (type: string) => {
    setSelectValue(type);
  };

  const newNormalization = (data: CanvasPath[], characterType: string) => {
    const array = Array(16);
    for (let i = 0; i < array.length; i++) {
      array[i] = Array(10).fill(0);
    }
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].paths.length; j++) {
        const { paths } = data[i];
        let x = Number.parseInt((paths[j].y / 10).toFixed(0));
        let y = Number.parseInt((paths[j].x / 10).toFixed(0));

        array[x][y] = 1;
      }
    }
    return {
      type: characterType,
      content: array.flat(),
    };
  };
  const getNewData = async () => {
    const data = await canvasRef.current
      ?.exportPaths()
      .then((data: CanvasPath[]) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });

    const newCharacter = newNormalization(data!, selectValue);
    setCharacter(newCharacter);
    setTestCharacter(newCharacter);
    setSelectValue('X');
  };

  const sendCharacter = async (character: NormalizedCharacter, endpoint: string) => {
    if (character.content.length !== 160) {
      changeStatusInfo('ERROR', `${character.content.length} - wrong size of character`);
      return;
    }
    if (character.type === 'X') {
      changeStatusInfo('ERROR', 'Character type must be a digit from 0 to 9');
      return;
    }
    const dbReference = ref(database, endpoint);

    push(child(dbReference, `/${character.type}`), character)
      .then(() => {
        changeStatusInfo('INFO', 'Sent');
      })
      .catch((err) => {
        changeStatusInfo('ERROR', err.message);
      });
  };

  const clearCanvas = () => {
    if (canvasRef) {
      canvasRef.current?.resetCanvas();
    }
  };

  return (
    <MyCanvasWrapper>
      <CanvasSection>
        <Canvas width="100" height="160" strokeWidth={8} strokeColor="black" style={canvasStyles} ref={canvasRef} />
        <CanvasButtonsWrapper>
          <DefaultButton onClick={() => getNewData()}>Get data</DefaultButton>
          <DefaultButton onClick={() => clearCanvas()}>Reset</DefaultButton>
          <DefaultButton onClick={() => character && sendCharacter(character, learnEndpoint)}>Send learning element</DefaultButton>
          <DefaultButton onClick={() => character && sendCharacter(character, testEndpoint)}>Send as Test element</DefaultButton>
        </CanvasButtonsWrapper>
        <Visualization pixels={character ? character.content : []} />
        <NumberSelectionMenu select={selectType} defaultValue={selectValue} />
      </CanvasSection>

      <Brain />
      <SolutionSection />
      {statusInfo.status === 'INFO' && <StatusInfo>{statusInfo.message}</StatusInfo>}
      {statusInfo.status === 'ERROR' && <StatusErrorInfo>{statusInfo.message}</StatusErrorInfo>}
    </MyCanvasWrapper>
  );
};

export default MyCanvas;

