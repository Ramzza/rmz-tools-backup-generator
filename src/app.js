import fs from 'fs';

async function copyFile(source, destination) {
  console.log('Source: ' + source.toString());
  console.log('Destination: ' + destination.toString());
  const destDir = destination.substring(0, destination.lastIndexOf('/'));
  console.log('destDir:' + destDir.toString());
  try {
    await fs.mkdir(destDir, { recursive: true });
    await fs.copyFile(source, destination);
  } catch (err) {
    // Handle error, for example by throwing or logging it
    console.error(`Error occurred: ${err}`);
    throw err.toString();
  }
}

// Example usage
try {
  copyFile('source.txt', 'destination.txt');
  console.log('Success!');
} catch (err) {
  console.error(err);
}

module.exports = { copyFile };
