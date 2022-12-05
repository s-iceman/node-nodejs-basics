import { argv } from 'node:process';

const parseArgs = () => {
    const res = [];
    let i = 2;
    while (i < argv.length) {
        res.push(`${argv[i].slice(2)} is ${argv[i + 1]}`);
        i += 2;
    }
    console.log(res.join(', '));
};

parseArgs();