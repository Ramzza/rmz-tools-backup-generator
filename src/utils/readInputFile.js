import fs from 'fs';

export default function readInputFile() {
  const inputJson = fs.readFileSync('input/input.json', 'utf8');
  return JSON.parse(inputJson);
}
