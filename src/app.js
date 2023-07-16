import dotenv from 'dotenv';
import copyFile from './utils/copyFile.js';

dotenv.config();

export default function main() {
  try {
    copyFile(
      process.env.INPUT_SOURCE_FILE,
      process.env.OUTPUT_DESTINATION_FILE
    );
    console.log('Success!');
  } catch (err) {
    console.error(err);
  }
}

main();
