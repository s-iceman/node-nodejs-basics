import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'url';

const FILENAME = 'fresh.txt';
const DIR_PATH = 'files';
const CONTENT = 'I am fresh and young';

const create = async (dir, filename, content) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const fullpath = path.join(__dirname, dir, filename);
    const res = await fs.stat(fullpath).catch(err => false);

    if (!res) {
        fs.writeFile(fullpath, content);
    } else {
        throw new Error('FS operation failed');
    }
};

await create(DIR_PATH, FILENAME, CONTENT);