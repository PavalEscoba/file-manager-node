import fs from 'fs/promises';
import path from 'path';

const isFileExist = async (pathToFile) => {
  try {
    await fs.stat(pathToFile);
    return true;
  } catch (error) {
    return false;
  }
};

const deleteFile = async (filePath) => {
  const fileName = path.resolve(process.cwd(), filePath);
  const fileStats = await isFileExist(fileName);
  if (!fileStats) {
    console.log('Operation failed');
  } else {
    try {
      await fs.unlink(fileName);
    } catch (error) {
      console.log('Operation failed');
    }
  }
};

export { deleteFile };
