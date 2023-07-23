import dotenv from 'dotenv';
import copyFile, { getSuffixedFileName } from './utils/copyFile.js';
import readInputFile from './utils/readInputFile.js';

dotenv.config();

export default function main() {
  try {
    const inputJson = readInputFile();

    inputJson.forEach((fileToCopy) => {
      copyFile(fileToCopy.src, getSuffixedFileName(fileToCopy.dest));
    });
    console.log('Success!');
  } catch (err) {
    console.error(err);
  }
}

main();
