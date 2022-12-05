import { cpus } from 'node:os';
import { Worker } from 'node:worker_threads';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const START_N = 10;

const doWork = async (n) => {
    return new Promise((resolve, reject) => {
        const workerPath = join(
            dirname(fileURLToPath(import.meta.url)),
            'worker.js'
        );
        const worker = new Worker(workerPath, { workerData: n });
        worker.on('message', resolve );
        worker.on('error', reject);
    })
}

const performCalculations = async (n) => {
    const systemCpuCores = cpus().length;

    let result = await Promise.allSettled(Array.from(Array(systemCpuCores).keys())
        .map(async (idx) => await doWork(n + idx)));

    result = result.sort((x, y) => x['value'] - y['value'])
        .map(e => {
            if (e['status'] === 'fulfilled') {
                return {status: 'resolved', data: e['value']};
            } else {
                return {status: 'error', data: null};
            }
        }
    );
    console.log(result);
};

await performCalculations(START_N);