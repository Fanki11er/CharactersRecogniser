import { BrainWrapper, Menu } from './Brain.styles';
import { NeuralNetworkGPU } from 'brain.js';
import { DefaultButton } from '../../Atoms/Buttons/Buttons';
import { child, get, ref } from 'firebase/database';
import { database } from '../../../Firebase/firebase';
import { NormalizedCharacter } from '../../../Interfaces/interfaces';
import { useContext, useState } from 'react';

import { CanvasContext } from '../../../Providers/NormalizedDataProvider';

const Brain = () => {
  const { normalizedCharacter } = useContext(CanvasContext);
  const [trainingCharacters, setTrainingCharacters] = useState<[]>([]);
  //const [testData, setTestData] = useState<NormalizedCharacter>()
  const [learnt, setLearnt] = useState<any>();

  const getLearningData = () => {
    const dbReference = ref(database, '/');
    get(child(dbReference, `Numbers`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setTrainingCharacters(snapshot.val());
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const net = new NeuralNetworkGPU({ hiddenLayers: [70, 70, 70] });
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
    // output: { [values[j].type]: Number.parseInt(data[i].type) },

    console.log('TRAINING', trainingData);
    //const stats = net.train(trainingData);
    const stats = net.train(trainingData, {
      log: true,
      logPeriod: 500,
      errorThresh: 0.000002,
      learningRate: 0.1,
      iterations: 30000,
      momentum: 0.1,
    });
    console.log(stats);
    //console.log("LENGTH" )
    //const result  = net.run(normalizedCharacter?.content);
    //console.log(result);
    setLearnt(net.toJSON());
  };
  const checkBrain = (net: NeuralNetworkGPU<unknown, unknown>) => {
    net.fromJSON(learnt);
    const result = net.run(normalizedCharacter?.content);
    console.log(result);
  };
  return (
    <BrainWrapper>
      <div>Brain</div>
      <Menu>
        <DefaultButton>Load learnt model</DefaultButton>
        <DefaultButton onClick={() => runBrain(net)}>Learn Brain</DefaultButton>
        <DefaultButton onClick={() => getLearningData()}>Load training data</DefaultButton>
        <DefaultButton onClick={() => checkBrain(net)}>TestMe</DefaultButton>
        <DefaultButton>Send learnt model</DefaultButton>
        <DefaultButton>Test session</DefaultButton>
      </Menu>
    </BrainWrapper>
  );
};
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

export default Brain;

/*
const crossValidate = new brain.CrossValidate(() => new brain.NeuralNetwork(networkOptions));
crossValidate.train(data, trainingOptions, k); //note k (or KFolds) is optional
const json = crossValidate.toJSON(); // all stats in json as well as neural networks
const net = crossValidate.toNeuralNetwork(); // get top performing net out of `crossValidate`

*/

