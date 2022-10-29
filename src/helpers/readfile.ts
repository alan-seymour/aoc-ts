import * as fs from 'fs';

const asyncReadFile = (fileName: string): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    fs.readFile(fileName, (error, result) => {
      if (error) {
        reject(error);
      }

      resolve(result);
    });
  });

export const getData = async (filename: string) => {
  try {
    const data = await asyncReadFile(filename);
    return data.toString();
  } catch (e) {
    if (e instanceof Error) {
      console.error(`Error reading file: ${e.message}`);
    }

    return '';
  }
};
