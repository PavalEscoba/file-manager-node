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

const decompressFile = async (archivePath, filePath) => {
  const archiveName = path.resolve(process.cwd(), archivePath + '.br');
  const fileName = path.resolve(process.cwd(), filePath);

  console.log('archiveName', archiveName);

  if (await !isFileExist(archiveName)) {
    console.log('Operation failed');
  } else {
    const sourceStream = fs.createReadStream(archiveName);
    const brotliCompress = zlib.createBrotliDecompress();
    const destinationStream = fs.createWriteStream(fileName);

    sourceStream.pipe(brotliCompress).pipe(destinationStream);

    sourceStream.on('error', (err) => {
      console.error('Operation failed sourceStream', err);
    });
    destinationStream.on('error', (err) => {
      console.log('Operation failed destinationStream', err);
    });
  }
};

export { decompressFile };
