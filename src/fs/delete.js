import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import { fileURLToPath } from 'url';


const ERROR_MSG = 'FS operation failed';
const DIR_PATH = 'files';
const SRC_FILE = 'fileToRemove.txt';

const remove = async (dirPath, filename, errMsg) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const src = path.join(__dirname, dirPath, filename);

    try {
        await fs.rm(src);
    } catch (err) {
        throw new Error(errMsg);
    }
};

await remove(DIR_PATH, SRC_FILE, ERROR_MSG);