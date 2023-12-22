import request from 'request';
import XLSX from 'xlsx';

export default async function downloadSheet(url) {
  if (!url) {
    throw new Error('url is undefined');
  }

  const promisifyGet = new Promise((resolve, reject) => {
    request.get(url, { encoding: null }, function (err, res, data) {
      if (err || res.statusCode !== 200) {
        reject(`Error downloading sheet: ${res.statusCode}`);
      }
      try {
        const buf = Buffer.from(data);
        const workbook = XLSX.read(buf);
        resolve(workbook); // return workbook data
      } catch (err) {
        reject(`Error parsing sheet: ${err}`);
      }
    });
  });

  const response = await promisifyGet;
  return response;
}
