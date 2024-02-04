// node imports

// custom scripts import
import { stopExecution } from './stop.js';
import {
  osBaseDir,
  osEOL,
  systemUserName,
  machineCPUs,
  showCPUs,
  cpuArch,
} from './os.js';
import { consoleCurrentDir } from './utils.js';

// basic variables
const processArgs = process.argv.slice(2);
const userNameArg = processArgs.find((arg) => arg.startsWith('--username='));
const userName = userNameArg
  ? userNameArg.replace(/--username=/, '')
  : 'Anonymous';

process.chdir(osBaseDir);
console.log(`%cWelcome to the File Manager, ${userName}!`, 'color:green');
console.log(`You're currently, ${process.cwd()}!`);

process.on('SIGINT', () => {
  stopExecution(userName);
});

process.stdin.on('data', (data) => {
  const input = data.toString().trim();
  if (input === '.exit') {
    stopExecution(userName);
  } else if (input === 'os --EOL') {
    console.log('EOL for the system is: ', osEOL);
  } else if (input === 'os --homedir') {
    console.log('Home directory is: ', osBaseDir);
  } else if (input === 'os --cpus') {
    showCPUs(machineCPUs);
  } else if (input === 'os --username') {
    console.log('System username is: ', systemUserName);
  } else if (input === 'os --architecture') {
    console.log('System username is: ', cpuArch);
  }
});
