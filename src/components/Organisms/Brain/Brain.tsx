import { BrainWrapper } from './Brain.styles';
import { NeuralNetwork } from 'brain.js';
import { data } from '../../../Data/Data';
import { DefaultButton } from '../../Atoms/Buttons/Buttons';

const Brain = () => {
  const runBrain = () => {
    const trainingData = [];

    for (let i = 0; i < data.length; i++) {
      console.log(data[i].content.length);

      trainingData.push({
        input: data[i].content,
        output: { [data[i].type]: Number.parseInt(data[i].type) },
      });
    }

    const net = new NeuralNetwork({ hiddenLayers: [5] });

    const stats = net.train(trainingData);

    console.log(stats);
  };
  return (
    <BrainWrapper>
      <div>Brain</div>
      <DefaultButton onClick={() => runBrain()}>Run Brain</DefaultButton>
    </BrainWrapper>
  );
};

export default Brain;

