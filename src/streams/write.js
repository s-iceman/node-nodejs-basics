import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as readline from 'node:readline';

const DIR = 'files';
const FILENAME = 'fileToWrite.txt';

const write = async (dir, filename) => {
    const dirname = path.dirname(fileURLToPath(import.meta.url));
    const filePath = path.join(dirname, dir, filename);

    const stream = fs.createWriteStream(filePath, 'utf8');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', (line) => {
        stream.write(line + '\n');
    });
    rl.once('close', () => {
        stream.write(rl.line);
    });
};


await write(DIR, FILENAME);