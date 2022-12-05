import { createGunzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { createReadStream, createWriteStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';

const SRC_FILE = 'archive.gz';
const TARGET_FILE = 'fileToCompress.txt';
const DIR = 'files';

const decompress = async (srcFile, targetFile, dir) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const source = createReadStream(path.join(__dirname, DIR, srcFile));
    const target = createWriteStream(path.join(__dirname, DIR, targetFile));

    pipeline(source, createGunzip(), target, (err) => {
      if (err) {
        console.error('An error occurred:', err);
        process.exitCode = 1;
      }
    });
};

await decompress(SRC_FILE, TARGET_FILE, DIR);