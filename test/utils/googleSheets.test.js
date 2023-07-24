import downloadSheet from '../../src/utils/googleSheets';
import request from 'request';

jest.mock('request');

request.__setSheetData = (sheetData) => {
  request.mockImplementation((options, callback) => {
    callback(null, { statusCode: 200 }, sheetData);
  });
};

request.__setStatusCode = (statusCode) => {
  request.mockImplementation((options, callback) => {
    callback(null, { statusCode }, null);
  });
};

describe('downloadSheet', () => {
  it('throws error if url is undefined', () => {
    expect(() => downloadSheet(undefined)).toThrow();
  });

  it('throws error if response status code is not 200', async () => {
    const errorMessage = 'Error downloading sheet: 404';
    request.__setStatusCode(404);

    expect(downloadSheet('url')).toThrow(errorMessage);
  });

  it('returns sheet data', async () => {
    const sheet1 = {};
    const sheet2 = {};
    request.__setSheetData([sheet1, sheet2]);

    expect(downloadSheet('url')).toEqual([sheet1, sheet2]);
  });
});
