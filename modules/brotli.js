import { compressFile } from './brotli/compress.js';
import { decompressFile } from './brotli/decompress.js';

async function brotliFile(command, filePath, secondFilePath) {
  switch (command) {
    case 'compress':
      compressFile(filePath, secondFilePath);
      break;
    case 'decompress':
      decompressFile(filePath, secondFilePath);
      break;
  }
}

export { brotliFile };
