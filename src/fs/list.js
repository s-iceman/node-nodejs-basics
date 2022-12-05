import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import { fileURLToPath } from 'url';

const ERROR_MSG = 'FS operation failed';
const DIR_PATH = 'files';

const list = async (dirPath, errMsg) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    try {
        const files = await fs.readdir(path.join(__dirname, dirPath));
        for (const file of files) {
            console.log(file);
        }
    } catch (err) {
        throw new Error(errMsg);
    }
};

await list(DIR_PATH, ERROR_MSG);