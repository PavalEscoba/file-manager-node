function stopExecution(username) {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
}

export { stopExecution };
