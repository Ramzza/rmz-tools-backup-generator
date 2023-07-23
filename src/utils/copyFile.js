import fs from 'fs';

export const getSuffixedFileName = (fileName) => {
  if (!fileName) {
    throw new Error('fileName is undefined');
  }
  const dotIndex = fileName.lastIndexOf('.');
  const suffix = new Date().toISOString().replace(/:/g, '-');
  return `${fileName.substring(0, dotIndex)}-${suffix}${fileName.substring(
    dotIndex
  )}`;
};

export default async function copyFile(source, destination) {
  if (!source) {
    throw new Error('Source is undefined');
  }
  if (!destination) {
    throw new Error('Destination is undefined');
  }
  const destDir = destination.substring(0, destination.lastIndexOf('/'));
  try {
    await fs.mkdir(destDir, { recursive: true }, (err) => {
      if (err) {
        console.log('Error: ' + err);
      }
    });
    await fs.copyFile(source, destination, (err) => {
      if (err) {
        console.log('Error: ' + err);
      }
    });
  } catch (err) {
    console.error(`Error occurred: ${err}`);
    throw err.toString();
  }
}
