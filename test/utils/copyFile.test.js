import fs from 'fs';
import copyFile from '../../src/utils/copyFile';

jest.mock('fs');

describe('copyfile', () => {
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
