import os from 'os';

const osEOL = JSON.stringify(os.EOL);
const osBaseDir = os.homedir();
const systemUserName = os.userInfo().username;
const machineCPUs = os.cpus();
const cpuArch = process.arch;

function showCPUs(cpus) {
  const cpuInfoArray = cpus.map((cpu) => {
    return { Model: cpu.model, rateGHz: `${cpu.speed / 1000} GHz` };
  });
  console.table(cpuInfoArray);
}

const osOperations = (args) => {
  switch (args[0]) {
    case '--cpus':
      showCPUs(machineCPUs);
      break;
    case '--EOL':
      console.log('EOL for the system is: ', osEOL);
      break;

    case '--homedir':
      console.log('Home directory is: ', osBaseDir);
      break;

    case '--username':
      console.log('System username is: ', systemUserName);
      break;

    case '--architecture':
      console.log('CPU architecture: ', cpuArch);
      break;

    default:
      console.log('Invalid input');
  }
};

export { osBaseDir, osOperations };
