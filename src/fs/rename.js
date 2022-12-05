import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import { fileURLToPath } from 'url';

const ERROR_MSG = 'FS operation failed';
const DIR_PATH = 'files';
const SRC_FILE = 'wrongFilename.txt';
const TARGET_FILE = 'properFilename.md';

const rename = async (dirPath, srcFile, targetFile, errMsg) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const src = path.join(__dirname, dirPath, srcFile);
    const target = path.join(__dirname, dirPath, targetFile);

    const isSrcNotExists = !(await fs.stat(src).catch(err => false));
    const isTargetExists = !!(await fs.stat(target).catch(err => false));
    if (isSrcNotExists || isTargetExists) {
        throw new Error(errMsg);
    }

    await fs.rename(src, target);
};

await rename(DIR_PATH, SRC_FILE, TARGET_FILE, ERROR_MSG);