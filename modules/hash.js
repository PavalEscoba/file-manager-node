import os from 'os';
import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { consoleCurrentDir } from '../helpers.js';

const isFileExist = async (pathToFile) => {
  try {
    await fsp.stat(pathToFile);
    return true;
  } catch (error) {
    return false;
  }
};

const hashFile = async (filePath) => {
  const fileName = path.resolve(process.cwd(), filePath);

  const fileStats = await isFileExist(fileName);
  if (!fileStats) {
    console.log('Operation failed');
  } else {
    const hash = crypto.createHash('sha256');
    const hashStream = fs.createReadStream(filePath);
    hashStream.on('data', (data) => {
      hash.update(data);
    });

    hashStream.on('error', () => {
      console.log('Operation failed');
    });

    hashStream.on('end', () => {
      const hashHEX = hash.digest('hex');
      console.log(hashHEX);
      consoleCurrentDir(os.homedir());
    });
  }
};

export { hashFile };
