const consoleCurrentDir = (path) => {
  console.log(`You are currently in ${path}`);
};

const handleCliInput = (data) => {
  // get rid of extra spaces
  const input = data.toString().replace(/\s+/g, ' ').trim();
  const command = input.split(' ')[0];
  const commandArgs = input.split(' ').slice(1);
  return { input, command, args: commandArgs };
};

export { consoleCurrentDir, handleCliInput };
