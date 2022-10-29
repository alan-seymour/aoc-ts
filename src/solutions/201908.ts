import chunk from 'lodash/chunk';
import { permutator } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string) => {
  const numbers = input.split('').map(num => parseInt(num, 10));
  return numbers;
};

export const pixelsToLayers = (pixels: number[], width: number, height: number): number[][] => {
  const layerSize = width * height;
  const layers = chunk(pixels, layerSize);
  return layers;
};

export const countDigitInLayer = (digit: number, layer: number[]): number =>
  layer.filter(pixel => pixel === digit).length;

export const findLayerBySmallestDigitCount = (digit: number, layers: number[][]): number[] => {
  const smallest = layers.reduce(
    ({ smallest, count }: { smallest: number[]; count: number }, layer) => {
      const zeros = countDigitInLayer(digit, layer);

      if (zeros < count) {
        return {
          smallest: layer,
          count: zeros,
        };
      }

      return {
        smallest,
        count,
      };
    },
    { smallest: [], count: Number.MAX_SAFE_INTEGER },
  ).smallest;

  return smallest;
};

export const addLayerToImage = (image: number[], layer: number[]): number[] => {
  const output = [];

  for (let i = 0; i < image.length; i++) {
    if (layer[i] === 2) {
      output[i] = image[i];
    } else {
      output[i] = layer[i];
    }
  }

  return output;
};

export const imageToString = (image: number[], width: number): string => {
  const characters = image.map(pixel => (pixel === 0 ? ' ' : '#'));
  const lineChars = chunk(characters, width);
  const lines = lineChars.map(line => line.join(''));
  return lines.join('\n');
};

export class Puzzle201908 extends PuzzleDay {
  part1() {
    const pixels = parseInput(this.input);
    const layers = pixelsToLayers(pixels, 25, 6);
    const smallestZeros = findLayerBySmallestDigitCount(0, layers);
    const ones = countDigitInLayer(1, smallestZeros);
    const twos = countDigitInLayer(2, smallestZeros);
    return `${ones * twos}`;
  }

  part2() {
    const pixels = parseInput(this.input);
    const layers = pixelsToLayers(pixels, 25, 6);
    let finalImage: number[] = new Array<number>(25 * 6);

    layers.reverse().forEach(layer => (finalImage = addLayerToImage(finalImage, layer)));

    const image = imageToString(finalImage, 25);
    return image;
  }
}
