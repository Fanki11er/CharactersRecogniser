import { BrainWrapper, LearningProgress, LearnSection, LearnSectionMenu, LoadedCharacters, ProgressInfo, SectionHeader, Title } from './Brain.styles';
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
  // const { normalizedCharacter } = useContext(CanvasContext);
  const [trainingCharacters, setTrainingCharacters] = useState<NormalizedCharacter[]>([]);
  const [trainedModel, setTrainedModel] = useState<INeuralNetworkJSON | undefined>(undefined);
  //const [loadedLearntModel, setLoadedLearntModel] = useState<INeuralNetworkJSON | undefined>(undefined);
  const [testingCharacters, setTestingCharacters] = useState<NormalizedCharacter[]>([]);
  const [accuracy, setAccuracy] = useState(0);
  const { changeStatusInfo } = useContext(StatusInfoContext);
  const [numberOfTrainingCharacters, setNumberOfTrainingCharacters] = useState(0);
  const [numberOfTestingCharacters, setNumberOfTestingCharacters] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [iteration, setIteration] = useState(0);
  const [error, setError] = useState(0);

  const { rootEndpoint, getLearnEndpoint, modelsEndpoint, testEndpoint, getTrainedModelEndpoint } = firebaseEndPoints;
  const net = new NeuralNetworkGPU({ hiddenLayers: [70, 70, 70] });
  const iterations = 3000;

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
          // setTestingCharacters(snapshot.val());
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

    console.log('TRAINING');

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
  /*const checkBrain = (net: NeuralNetworkGPU<unknown, unknown>) => {
    learntModel && net.fromJSON(learntModel);
    const result = net.run(normalizedCharacter?.content);
    console.log(result);
  };*/

  const testBrain = (net: NeuralNetworkGPU<unknown, unknown>) => {
    setIsTesting(true);
    if (trainedModel && testingCharacters.length > 0) {
      net.fromJSON(trainedModel);
      let goodSolutions = 0;
      let all = 0;
      for (let i = 0; i < testingCharacters.length; i++) {
        const values = Object.values(testingCharacters[i]) as NormalizedCharacter[];
        all += values.length;
        for (let j = 0; j < values.length; j++) {
          const result = likely(values[j].content, net) as any;
          if (result === values[j].type) {
            goodSolutions += 1;
          }
        }
      }
      setIsTesting(false);
      setAccuracy((goodSolutions / all) * 100);
      return;
    }
    return;
  };

  return (
    <BrainWrapper>
      <Title>NeuralNetwork</Title>
      <LearnSection>
        <SectionHeader>Train Section</SectionHeader>
        <LoadedCharacters>{`Training characters: ${numberOfTrainingCharacters}`}</LoadedCharacters>
        <LearningProgress>
          <ProgressInfo>{`Error: ${error > 0 ? error.toFixed(8) : '------'}`}</ProgressInfo>
          <ProgressInfo>{`Iteration: ${iteration > 0 ? iteration : '------'} / ${iterations}`}</ProgressInfo>
        </LearningProgress>
        <LearnSectionMenu>
          <DefaultButton onClick={() => teachBrain()}>Train Network</DefaultButton>
          {trainedModel ? (
            <DefaultButton onClick={() => sendModel(trainedModel, rootEndpoint, modelsEndpoint)}>Save model</DefaultButton>
          ) : (
            <DisabledButton>Save model</DisabledButton>
          )}
        </LearnSectionMenu>
      </LearnSection>
      <DefaultButton onClick={() => testBrain(net)}>Test</DefaultButton>
    </BrainWrapper>
  );
};

export default Brain;

/*const trainingTes = ()=> {
  const testNet = new NeuralNetworkGPU({hiddenLayers: [10,10]});
  const trainingData= [
    {input: [1,1,0,0,0,0,0,0,0,0], output: {[1]: 1}},
    {input: [0,1,1,0,0,0,0,0,0,0], output: {[1]: 1}},
    {input: [0,0,0,1,1,0,0,0,0,0], output: {[2]: 1}},
    {input: [0,0,0,0,1,1,0,0,0,0,], output: {[2]: 1}},
    {input: [0,0,0,0,0,0,0,0,0,1,1], output: {[3]: 1}},
    {input: [0,0,0,0,0,0,0,1,1,0,], output: {[3]: 1}},
  ]
  
  const stats = testNet.train(trainingData, {
    log: true,
    logPeriod: 500,
    errorThresh: 0.0001,
    learningRate: 0.3,
    iterations: 10000,
    momentum: 0.1,
  });
  console.log(stats);
  
  const result  = testNet.run([1,1,0,0,0,0,0,0,0,0]);
      console.log(result);

}

trainingTes();*/
//;

/*
const crossValidate = new brain.CrossValidate(() => new brain.NeuralNetwork(networkOptions));
crossValidate.train(data, trainingOptions, k); //note k (or KFolds) is optional
const json = crossValidate.toJSON(); // all stats in json as well as neural networks
const net = crossValidate.toNeuralNetwork(); // get top performing net out of `crossValidate`

*/

/*<Menu>
        <DefaultButton>Load learnt model</DefaultButton>
        <DefaultButton onClick={() => runBrain(net)}>Learn Brain</DefaultButton>
        <DefaultButton onClick={() => getLearningData()}>Load training data</DefaultButton>
        <DefaultButton onClick={() => checkBrain(net)}>TestMe</DefaultButton>
        
        <DefaultButton>Test session</DefaultButton>
      </Menu> */

