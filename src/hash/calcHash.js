import { dirname, join } from 'node:path';
import { fileURLToPath } from 'url';
import * as fs from 'node:fs/promises';
import { stdout } from 'node:process';

const FILENAME = 'fileToCalculateHashFor.txt';
const DIR = 'files';

const calculateHash = async (dir, filename) => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filePath = join(__dirname, DIR, FILENAME);

    const { createHash } = await import('node:crypto');
    const input = await fs.readFile(filePath);
    const hash = createHash('sha256');
    stdout.write(hash.update(input.toString()).digest('hex') + '\n');
};


await calculateHash(DIR, FILENAME);