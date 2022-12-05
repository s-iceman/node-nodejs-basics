import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import { fileURLToPath } from 'url';

const ERROR_MSG = 'FS operation failed';
const DIR_NAME = 'files';
const FILE_NAME = 'fileToRead.txt';

const read = async (dir, filename, errMsg) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filePath = path.join(__dirname, DIR_NAME, FILE_NAME);

    try {
        const content = await fs.readFile(filePath, { encoding: 'utf8' });
        console.log(content);
    } catch (err) {
        throw new Error(errMsg);
    }
};

await read(DIR_NAME, FILE_NAME, ERROR_MSG);