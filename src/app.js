import dotenv from 'dotenv';
import copyFile from './utils/copyFile.js';
import readInputFile from './utils/readInputFile.js';

dotenv.config();

export default function main() {
  try {
    const inputJson = readInputFile();

    inputJson.forEach((fileToCopy) => {
      copyFile(fileToCopy.src, fileToCopy.dest);
    });
    console.log('Success!');
  } catch (err) {
    console.error(err);
  }
}

main();
