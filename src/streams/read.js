import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = 'files';
const FILENAME = 'fileToRead.txt';

const read = async (dir, filename) => {
    const dirname = path.dirname(fileURLToPath(import.meta.url));
    const filePath = path.join(dirname, dir, filename);
    
    const stream = fs.createReadStream(filePath, 'utf8');
    stream.on('data', chunk => process.stdout.write(chunk));
    stream.on('end', err => process.stdout.write('\n\n'));
};

await read(DIR, FILENAME);