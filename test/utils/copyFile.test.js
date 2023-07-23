import fs from 'fs';
import copyFile, { getSuffixedFileName } from '../../src/utils/copyFile';

jest.mock('fs');

describe('getSuffixedFileName', () => {
  it('throws error if fileName is undefined', () => {
    expect(() => getSuffixedFileName(undefined)).toThrow();
  });

  it('returns suffixed file name', () => {
    const fileName = 'file.txt';
    const suffixedFileName = getSuffixedFileName(fileName);

    const regex = /^file-\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}\.\d{3}Z\.txt$/;
    expect(suffixedFileName).toMatch(regex);
  });
});

describe('copyfile', () => {
  it('throws error if source is undefined', async () => {
    await expect(copyFile(undefined, 'destination.txt')).rejects.toThrow();
  });

  it('throws error if destination is undefined', async () => {
    await expect(copyFile('source.txt', undefined)).rejects.toThrow();
  });

  it('copies file successfully', async () => {
    fs.mkdir.mockImplementation((path, options) => {});
    fs.copyFile.mockImplementation((src, dest) => {});

    await expect(
      copyFile('source.txt', 'destination.txt')
    ).resolves.not.toThrow();

    expect(fs.mkdir).toHaveBeenCalledWith(
      '',
      { recursive: true },
      expect.any(Function)
    );
    expect(fs.copyFile).toHaveBeenCalledWith(
      'source.txt',
      'destination.txt',
      expect.any(Function)
    );
  });

  it('throws error if directory creation fails', async () => {
    const errorMessage = 'Error creating destination directory: Error';

    fs.mkdir.mockImplementation((path, options) => {
      throw errorMessage;
    });

    await expect(copyFile('source.txt', 'destination.txt')).rejects.toEqual(
      errorMessage
    );
  });

  it('throws error if file copy fails', async () => {
    const errorMessage = 'Error copying file: Error';

    fs.mkdir.mockImplementation((path, options) => {});
    fs.copyFile.mockImplementation((src, dest) => {
      throw errorMessage;
    });

    await expect(copyFile('source.txt', 'destination.txt')).rejects.toEqual(
      errorMessage
    );
  });
});
