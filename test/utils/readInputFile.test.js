import readInputFile from '../../src/utils/readInputFile.js';
import fs from 'fs';

jest.mock('fs');

describe('readInputFile', () => {
  it('PRD-001: reads input file', () => {
    fs.readFileSync.mockReturnValue(
      '[{"src": "src1", "dest": "dest1"}, {"src": "src2", "dest": "dest2"}]'
    );
    const readResult = readInputFile();
    expect(fs.readFileSync).toHaveBeenCalledWith('input/input.json', 'utf8');
    expect(readResult).toEqual([
      { src: 'src1', dest: 'dest1' },
      { src: 'src2', dest: 'dest2' },
    ]);
  });

  it('PRD-001: throws on invalid input file', () => {
    fs.readFileSync.mockReturnValue('{ invalid json');
    expect(() => readInputFile()).toThrow();
  });
});
