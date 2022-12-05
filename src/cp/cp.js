import { fork } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';


const spawnChildProcess = async (args) => {
    const filepath = join(dirname(fileURLToPath(import.meta.url)), 'files', 'script.js');
    fork(filepath, args);
};

spawnChildProcess();