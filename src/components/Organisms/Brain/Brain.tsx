import {
  BrainWrapper,
  LearningProgress,
  LearnSection,
  LearnSectionMenu,
  LoadedCharacters,
  ProgressInfo,
  SectionHeader,
  TestSectionMenu,
  Title,
  WorkingStatus,
} from './Brain.styles';
import { NeuralNetworkGPU, likely } from 'brain.js';
import { DefaultButton, DisabledButton } from '../../Atoms/Buttons/Buttons';
import { child, get, ref, set } from 'firebase/database';
import { database } from '../../../Firebase/firebase';
import { NormalizedCharacter } from '../../../Interfaces/interfaces';
import { useContext, useEffect, useState } from 'react';
import { CanvasContext } from '../../../Providers/NormalizedDataProvider';
import { firebaseEndPoints } from '../../../Firebase/Endpoints';
import { StatusInfoContext } from '../../../Providers/StatusInfoProvider';
import { INeuralNetworkState } from 'brain.js/dist/src/neural-network-types';
import { INeuralNetworkJSON } from 'brain.js/dist/src/neural-network';

const Brain = () => {
  const { normalizedCharacter, wantSolution, checkWhatNumberItIs } = useContext(CanvasContext);
  const [trainingCharacters, setTrainingCharacters] = useState<NormalizedCharacter[]>([]);
  const [trainedModel, setTrainedModel] = useState<INeuralNetworkJSON | undefined>(undefined);
  const [testingCharacters, setTestingCharacters] = useState<NormalizedCharacter[]>([]);
  const [accuracy, setAccuracy] = useState(0);
  const { changeStatusInfo } = useContext(StatusInfoContext);
  const [numberOfTrainingCharacters, setNumberOfTrainingCharacters] = useState(0);
  const [numberOfTestingCharacters, setNumberOfTestingCharacters] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [iteration, setIteration] = useState(0);
  const [error, setError] = useState(0);
  const [processedValue, setProcessedValue] = useState(0);

  const { rootEndpoint, getLearnEndpoint, modelsEndpoint, testEndpoint, getTrainedModelEndpoint } = firebaseEndPoints;
  const net = new NeuralNetworkGPU({ hiddenLayers: [200, 200, 200] });
  const iterations = 20000;

  useEffect(() => {
    countCharacters(trainingCharacters);
  }, [trainingCharacters]);

  const countCharacters = (trainingCharacters: NormalizedCharacter[]) => {
    let counter = 0;
    for (let i = 0; i < trainingCharacters.length; i++) {
      const values = Object.values(trainingCharacters[i]) as NormalizedCharacter[];
      counter += values.length;
    }
    return counter;
  };

  useEffect(() => {
    trainingCharacters.length > 0 && isTraining && runBrain(net);
  }, [trainingCharacters, isTraining]); // eslint-disable-line

  useEffect(() => {
    testingCharacters.length === 0 && isTesting && getTestingData();
    !trainedModel && isTesting && getTrainedModel();
    trainedModel && isTesting && testingCharacters.length > 0 && testBrain(net);
  }, [testingCharacters, isTesting, trainedModel]); // eslint-disable-line

  useEffect(() => {
    wantSolution && !trainedModel && getTrainedModel();
    wantSolution && trainedModel && normalizedCharacter && findSolution(net);
  }, [wantSolution, trainedModel, normalizedCharacter]); // eslint-disable-line

  const getTrainingData = () => {
    const dbReference = ref(database, rootEndpoint);
    get(child(dbReference, getLearnEndpoint))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setTrainingCharacters(snapshot.val());
          const counted = countCharacters(snapshot.val());
          setNumberOfTrainingCharacters(counted);
          changeStatusInfo('INFO', 'Training characters loaded');
        } else {
          changeStatusInfo('INFO', 'There is no training characters');
        }
      })
      .catch((error) => {
        changeStatusInfo('ERROR', error.message);
        setIsTraining(false);
      });
  };

  const getTestingData = () => {
    const dbReference = ref(database, rootEndpoint);
    get(child(dbReference, testEndpoint))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setTestingCharacters(snapshot.val());
          const counted = countCharacters(snapshot.val());
          setNumberOfTestingCharacters(counted);
          changeStatusInfo('INFO', 'Testing characters loaded');
        } else {
          changeStatusInfo('INFO', 'There is no testing characters');
        }
      })
      .catch((error) => {
        changeStatusInfo('ERROR', error.message);
        setIsTesting(false);
      });
  };

  const getTrainedModel = () => {
    const dbReference = ref(database, modelsEndpoint);
    get(child(dbReference, getTrainedModelEndpoint))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setTrainedModel(JSON.parse(snapshot.val()));

          changeStatusInfo('INFO', 'Trained model loaded');
        } else {
          changeStatusInfo('INFO', 'There is no trained model');
        }
      })
      .catch((error) => {
        changeStatusInfo('ERROR', error.message);
        setIsTesting(false);
      });
  };

  const sendModel = async (model: INeuralNetworkJSON, rootEndpoint: string, modelEndpoint: string) => {
    if (!model) {
      return;
    }

    const dbReference = ref(database, rootEndpoint);

    set(child(dbReference, `/${modelEndpoint}/Model`), JSON.stringify(model))
      .then(() => {
        changeStatusInfo('INFO', 'Model Sent');
      })
      .catch((err) => {
        changeStatusInfo('ERROR', err.message);
      });
  };

  const changeLearningStatus = (error: number, iterations: number) => {
    setError(error);
    setIteration(iterations);
  };

  const teachBrain = () => {
    setIsTraining(true);
    if (trainingCharacters.length === 0) {
      getTrainingData();
    }
  };

  const runBrain = (net: NeuralNetworkGPU<unknown, unknown>) => {
    const trainingData = [];

    for (let i = 0; i < trainingCharacters.length; i++) {
      const values = Object.values(trainingCharacters[i]) as NormalizedCharacter[];
      for (let j = 0; j < values.length; j++) {
        trainingData.push({
          input: values[j].content,
          output: { [values[j].type]: 1 },
        });
      }
    }

    net
      .trainAsync(trainingData, {
        log: (stats: INeuralNetworkState) => changeLearningStatus(stats.error, stats.iterations),
        logPeriod: 500,
        errorThresh: 0.000002,
        learningRate: 0.1,
        iterations: iterations,
        momentum: 0.1,
      })
      .then(() => {
        changeStatusInfo('INFO', 'Network learnt');
        setTrainedModel(net.toJSON());
        setIsTraining(false);
      })
      .catch((err) => {
        changeStatusInfo('ERROR', err.message);
        setIsTraining(false);
      });
  };

  const testBrain = (net: NeuralNetworkGPU<unknown, unknown>) => {
    changeStatusInfo('INFO', 'Tests started');
    setIsTesting(true);
    setProcessedValue(0);
    setAccuracy(0);
    if (trainedModel && testingCharacters.length > 0) {
      net.fromJSON(trainedModel);
      let goodSolutions = 0;
      let all = 0;
      for (let i = 0; i < testingCharacters.length; i++) {
        const values = Object.values(testingCharacters[i]) as NormalizedCharacter[];
        all += values.length;
        for (let j = 0; j < values.length; j++) {
          setProcessedValue(processedValue + 1);

          const result = likely(values[j].content, net) as any;
          if (result === values[j].type) {
            goodSolutions += 1;
          }
        }
      }
      setIsTesting(false);
      setProcessedValue(all);
      setAccuracy((goodSolutions / all) * 100);
      return;
    }
    return;
  };

  const findSolution = (net: NeuralNetworkGPU<unknown, unknown>) => {
    changeStatusInfo('INFO', 'Solving... ');
    if (trainedModel && normalizedCharacter) {
      net.fromJSON(trainedModel);
      const result = net.run(normalizedCharacter.content);
      checkWhatNumberItIs(result);
      return;
    }
    return;
  };

  return (
    <BrainWrapper>
      <Title>NeuralNetwork</Title>
      <LearnSection>
        <WorkingStatus isWorking={isTraining} />
        <SectionHeader>Train Section</SectionHeader>

        <LoadedCharacters>{`Training characters: ${numberOfTrainingCharacters}`}</LoadedCharacters>
        <LearningProgress>
          <ProgressInfo>{`Error: ${error > 0 ? error.toFixed(8) : '------'}`}</ProgressInfo>
          <ProgressInfo>{`Iteration: ${iteration > 0 ? iteration : '------'} / ${iterations}`}</ProgressInfo>
        </LearningProgress>
        <LearnSectionMenu>
          <DefaultButton onClick={() => teachBrain()}>Train Network</DefaultButton>
          <DefaultButton onClick={() => getTrainingData()}>Reload data</DefaultButton>
          {trainedModel ? (
            <DefaultButton onClick={() => sendModel(trainedModel, rootEndpoint, modelsEndpoint)}>Save model</DefaultButton>
          ) : (
            <DisabledButton>Save model</DisabledButton>
          )}
        </LearnSectionMenu>
      </LearnSection>
      <LearnSection>
        <WorkingStatus isWorking={isTesting} />
        <SectionHeader>Test Section</SectionHeader>

        <LoadedCharacters>{`Testing characters: ${numberOfTestingCharacters}`}</LoadedCharacters>
        <LearningProgress>
          <ProgressInfo>{`Processed: ${processedValue} / ${numberOfTestingCharacters}`}</ProgressInfo>
          <ProgressInfo>{`Accuracy: ${accuracy > 0 ? `${accuracy.toFixed(2)}%` : '------'}`}</ProgressInfo>
        </LearningProgress>
        <TestSectionMenu>
          <DefaultButton onClick={() => testBrain(net)}>Test with test data</DefaultButton>
          <DefaultButton onClick={() => getTestingData()}>Reload data</DefaultButton>
        </TestSectionMenu>
      </LearnSection>
    </BrainWrapper>
  );
};

export default Brain;

