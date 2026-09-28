import app from '../src/app.js';
import readInputFile from '../src/utils/readInputFile.js';
import copyFile, { getSuffixedFileName } from '../src/utils/copyFile.js';

jest.mock('../src/utils/readInputFile');
jest.mock('../src/utils/copyFile');

describe('app', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('PRD-001: does not copy on missing input', async () => {
    readInputFile.mockReturnValue(null);
    copyFile.mockReturnValue(null);
    app();
    expect(readInputFile).toHaveBeenCalled();
    expect(getSuffixedFileName).not.toHaveBeenCalled();
    expect(copyFile).not.toHaveBeenCalled();
  });

  it('does not throw if copyFile throws', async () => {
    const input = [{ sr: 'src1', des: 'dest1' }];
    readInputFile.mockReturnValue(input);
    copyFile.mockReturnValue(() => {
      throw new Error();
    });
    app();
    expect(readInputFile).toHaveBeenCalled();
    expect(getSuffixedFileName).toHaveBeenCalled(undefined);
    expect(copyFile).toHaveBeenCalledWith(undefined, undefined);
    expect(app).not.toThrow();
  });

  it('PRD-002: copies every file from the input list', async () => {
    const input = [
      { src: 'src1', dest: 'dest1' },
      { src: 'src2', dest: 'dest2' },
    ];
    readInputFile.mockReturnValue(input);
    getSuffixedFileName.mockImplementation((filename) => `${filename}-timestamp`);
    copyFile.mockReturnValue(null);
    app();
    expect(readInputFile).toHaveBeenCalled();
    expect(getSuffixedFileName).toHaveBeenCalledTimes(2);
    expect(getSuffixedFileName).toHaveBeenNthCalledWith(1, 'dest1');
    expect(getSuffixedFileName).toHaveBeenNthCalledWith(2, 'dest2');
    expect(copyFile).toHaveBeenCalledTimes(2);
    expect(copyFile).toHaveBeenNthCalledWith(1, 'src1', 'dest1-timestamp');
    expect(copyFile).toHaveBeenNthCalledWith(2, 'src2', 'dest2-timestamp');
  });
});
