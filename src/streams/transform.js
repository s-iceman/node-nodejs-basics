import { Transform } from 'node:stream';

const transform = async () => {
    const reverseTr = new Transform({
        transform(chunk, encoding, callback) {
            this.push(chunk.toString().slice(0, -1).split('').reverse().join('') + '\n');
            callback();
        }
    });
    process.stdin.pipe(reverseTr).pipe(process.stdout);
};

await transform();