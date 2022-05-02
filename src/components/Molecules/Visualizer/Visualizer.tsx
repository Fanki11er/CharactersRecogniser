import { EmptyPixel, FilledPixel, VisualizerWrapper } from './Visualizer.styles';

interface Props {
  pixels: number[];
}

const Visualization = (props: Props) => {
  const { pixels } = props;

  const renderPixels = (pixels: number[]) => {
    return pixels.map((pixel) => {
      return pixel ? <FilledPixel /> : <EmptyPixel />;
    });
  };
  return <VisualizerWrapper>{pixels && renderPixels(pixels)}</VisualizerWrapper>;
};

export default Visualization;
