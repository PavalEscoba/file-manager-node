import { read } from './files/read.js';
import { deleteFile } from './files/delete.js';
import { createFile } from './files/create.js';

async function filesHandle(command, filePath, secondFilePath) {
  switch (command) {
    case 'add':
      await createFile(filePath);
      break;
    case 'cat':
      await read(filePath);
      break;
    case 'rm':
      await deleteFile(filePath);
      break;
    // case 'rn'
    // await renameFile(filePath, secondFilePath)
  }
}

export { filesHandle };
