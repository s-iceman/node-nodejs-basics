import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'url';

const ERROR_MSG = 'FS operation failed';
const SRC_DIR = 'files';
const TARGET_DIR = 'files_copy';

const copy = async (srcDir, targetDir, errorMsg) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const src = path.join(__dirname, srcDir);
    const target = path.join(__dirname, targetDir);

    const isSrcDirNotExists = !(await fs.stat(src).catch(err => false));
    const isTargetDirExists = !!(await fs.stat(target).catch(e => false));
    if (isSrcDirNotExists || isTargetDirExists) {
      throw new Error(errorMsg);
    }

    try {
      await fs.mkdir(target, {recursive: true}, () => {});
      const files = await fs.readdir(src);
      for (const fileName of files) {
        fs.copyFile(path.join(src, fileName), path.join(target, fileName));
      }
    } catch (err) {
      throw new Error(errorMsg);
    }
};


copy(SRC_DIR, TARGET_DIR, ERROR_MSG);