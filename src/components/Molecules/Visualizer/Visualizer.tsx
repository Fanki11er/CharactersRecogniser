import { EmptyPixel, FilledPixel, VisualizerWrapper } from './Visualizer.styles';

interface Props {
  pixels: number[];
}

const Visualization = (props: Props) => {
  const { pixels } = props;

  const renderPixels = (pixels: number[]) => {
    return pixels.map((pixel, index) => {
      return pixel ? <FilledPixel key={index} /> : <EmptyPixel key={index} />;
    });
  };
  return <VisualizerWrapper>{pixels && renderPixels(pixels)}</VisualizerWrapper>;
};

export default Visualization;

