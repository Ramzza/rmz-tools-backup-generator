import readInputFile from '../../src/utils/readInputFile.js';
import fs from 'fs';

jest.mock('fs');

describe('readInputFile', () => {
  it('reads input file', () => {
    fs.readFileSync.mockReturnValue(
      '[{"src": "src1", "dest": "dest1"}, {"src": "src2", "dest": "dest2"}]'
    );
    const readResult = readInputFile();
    expect(readResult).toEqual([
      { src: 'src1', dest: 'dest1' },
      { src: 'src2', dest: 'dest2' },
    ]);
  });

  it('throws on invalid input file', () => {
    fs.readFileSync.mockReturnValue(() => {
      throw new Error();
    });
    expect(() => readInputFile()).toThrow();
  });
});
