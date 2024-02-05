import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';

const isFileExist = async (pathToFile) => {
  try {
    await fsp.stat(pathToFile);
    return true;
  } catch (error) {
    return false;
  }
};

const read = async (filePath) => {
  const fileName = path.resolve(process.cwd(), filePath);
  const fileStats = await isFileExist(fileName);

  if (!fileStats) {
    console.log('Operation failed');
  } else {
    const readStream = fs.createReadStream(fileName);
    readStream.pipe(process.stdout);
    readStream.on('error', () => {
      console.log('Operation failed');
    });
  }
};

export { read };
