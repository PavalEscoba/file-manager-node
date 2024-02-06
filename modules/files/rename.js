import fs from 'fs/promises';
import path from 'path';

const renameFile = async (filePath, newFileName) => {
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

export { renameFile };
