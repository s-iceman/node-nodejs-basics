const MASK = 'RSS_';

const parseEnv = (substr) => {
    const vars = process.env;
    const res = Object.entries(vars)
        .filter(([k, v]) => k.startsWith(substr))
        .map(e => e.join('='))
        .join('; ');
    console.log(res);
};

parseEnv(MASK);