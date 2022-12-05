import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { createReadStream, createWriteStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';

const SRC_FILE = 'fileToCompress.txt';
const TARGET_FILE = 'archive.gz';
const DIR = 'files';

const compress = async (srcFile, targetFile, dir) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const source = createReadStream(path.join(__dirname, DIR, srcFile));
    const target = createWriteStream(path.join(__dirname, DIR, targetFile));

    pipeline(source, createGzip(), target, (err) => {
      if (err) {
        console.error('An error occurred:', err);
        process.exitCode = 1;
      }
    }); 
};

await compress(SRC_FILE, TARGET_FILE, DIR);