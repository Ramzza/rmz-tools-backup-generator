import dotenv from 'dotenv';
import copyFile, { getSuffixedFileName } from './utils/copyFile.js';
import downloadSheet from './utils/googleSheets.js';
import readInputFile from './utils/readInputFile.js';

dotenv.config();

export default function main(useCase) {
  try {
    switch (useCase) {
      case 'copyFile': {
        const inputJson = readInputFile();

        inputJson.forEach((fileToCopy) => {
          copyFile(fileToCopy.src, getSuffixedFileName(fileToCopy.dest));
        });
        break;
      }
      case 'googleSheets': {
        downloadSheet(process.env.GOOGLE_SHEET_URL);
      }
    }
    console.log('Success!');
  } catch (err) {
    console.error(err);
  }
}

main(process.env.USE_CASE);
