import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import zlib from 'zlib';

const isFileExist = async (pathToFile) => {
  try {
    await fsp.stat(pathToFile);
    return true;
  } catch (error) {
    return false;
  }
};

const compressFile = async (filePath, archivePath) => {
  const fileName = path.resolve(process.cwd(), filePath);
  const archiveName = path.resolve(process.cwd(), archivePath);

  console.log('filePath', fileName);
  console.log('secondFilePath', archiveName);

  const condition =
    (await !isFileExist(fileName)) || (await isFileExist(archiveName));
  if (condition) {
    console.log('Operation failed');
  } else {
    const sourceStream = fs.createReadStream(fileName);
    const brotliCompress = zlib.createBrotliCompress();
    const destinationStream = fs.createWriteStream(archiveName + '.br');

    sourceStream.pipe(brotliCompress).pipe(destinationStream);

    sourceStream.on('error', (err) => {
      console.error('Operation failed sourceStream', err);
    });
    destinationStream.on('error', (err) => {
      console.log('Operation failed destinationStream', err);
    });
  }
};

export { compressFile };
