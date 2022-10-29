import { describe, test, expect, beforeEach } from 'vitest';
import {
  Puzzle201908,
  pixelsToLayers,
  parseInput,
  countDigitInLayer,
  findLayerBySmallestDigitCount,
  addLayerToImage,
  imageToString,
} from './201908';

describe('201908', () => {
  test('parseInput', () => {
    const input = '123456789012';
    const result = parseInput(input);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2]);
  });

  test('pixelsToLayers example 1', () => {
    const inputPixels = parseInput('123456789012');
    const result = pixelsToLayers(inputPixels, 3, 2);

    expect(result).toEqual([
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 0, 1, 2],
    ]);
  });

  test('countDigitInLayer', () => {
    const layer = [1, 2, 3, 4, 1, 2, 3, 1];
    const result = countDigitInLayer(1, layer);
    expect(result).toEqual(3);
  });

  test('findLayerBySmallestDigitCount', () => {
    const layers = [
      [1, 1, 1, 1],
      [1, 1, 1, 2],
      [1, 1, 1, 3],
      [1, 1, 0, 3],
    ];

    const result = findLayerBySmallestDigitCount(1, layers);
    expect(result).toEqual([1, 1, 0, 3]);
  });

  test('addLayerToImage', () => {
    const image = [0, 1, 0, 1, 0, 1, 0];
    const layer = [0, 1, 2, 0, 1, 2, 0];
    const result = addLayerToImage(image, layer);
    expect(result).toEqual([0, 1, 0, 0, 1, 1, 0]);
  });

  test('imageToString', () => {
    const image = [0, 1, 0, 1, 0, 1];
    const result = imageToString(image, 3);
    expect(result).toEqual(` # \n# #`);
  });
});
