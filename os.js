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

export { osEOL, osBaseDir, systemUserName, machineCPUs, showCPUs, cpuArch };
