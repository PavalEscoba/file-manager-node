// node imports

// custom scripts import
import { stopExecution } from './stop.js';
import { consoleCurrentDir, handleCliInput } from './helpers.js';

import { osOperations, osBaseDir } from './modules/os.js';
import { filesHandle } from './modules/files.js';
import { hashFile } from './modules/hash.js';
import { brotliFile } from './modules/brotli.js';

// basic variables
const processArgs = process.argv.slice(2);
const userNameArg = processArgs.find((arg) => arg.startsWith('--username='));
const userName = userNameArg
  ? userNameArg.replace(/--username=/, '')
  : 'Anonymous';

process.chdir(osBaseDir);
const currentDirectory = process.cwd();
console.log(`Welcome to the File Manager, ${userName}!`);
console.log(`You're currently in, ${currentDirectory}!`);

process.on('SIGINT', () => {
  stopExecution(userName);
});

process.stdin.on('data', (data) => {
  const { command, args } = handleCliInput(data);

  if (command === '.exit') {
    stopExecution(userName);
  }

  switch (command) {
    case 'os':
      osOperations(args);
      consoleCurrentDir(currentDirectory);
      break;

    case 'add':
    case 'cat':
    case 'rm':
      if (!args[0]) {
        console.log('Invalid input');
        consoleCurrentDir(currentDirectory);
        break;
      }
      filesHandle(command, args[0]);
      consoleCurrentDir(currentDirectory);
      break;

    case 'rn':
    case 'cp':
    case 'mv':
      if (!args[0] || !args[1]) {
        console.log('Invalid input');
        consoleCurrentDir(currentDirectory);
        break;
      }
      filesHandle(command, args[0]);
      consoleCurrentDir(currentDirectory);
      break;
    case 'hash':
      if (!args[0]) {
        console.log('Invalid input');
        consoleCurrentDir(currentDirectory);
        break;
      }
      hashFile(args[0]);
      break;

    case 'compress':
    case 'decompress':
      if (!args[0] || !args[1]) {
        console.log('Invalid input');
        consoleCurrentDir(currentDirectory);
        break;
      }
      brotliFile(command, args[0], args[1]);
      consoleCurrentDir(currentDirectory);
      break;
    default:
      console.log('Invalid input');
      consoleCurrentDir(currentDirectory);
  }
});
