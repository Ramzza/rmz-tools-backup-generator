import fs from 'fs';

export default async function copyFile(source, destination) {
  console.log('Source: ' + source.toString());
  console.log('Destination: ' + destination.toString());
  const destDir = destination.substring(0, destination.lastIndexOf('/'));
  console.log('destDir:' + destDir.toString());
  try {
    await fs.mkdir(destDir, { recursive: true }, (err) => {
      console.log('Error: ' + err);
    });
    await fs.copyFile(source, destination, (err) => {
      console.log('Error: ' + err);
    });
  } catch (err) {
    // Handle error, for example by throwing or logging it
    console.error(`Error occurred: ${err}`);
    throw err.toString();
  }
}
