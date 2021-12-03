#!/usr/bin/env node

'use strict';

const fs = require('fs/promises');
const path = require('path');
const args = require('args');

args
    .option('input', 'the input file path', 'day3.input');

const flags = args.parse(process.argv);

async function main() {
    const input = flags.input;

    const data = await fs.readFile(path.resolve(__dirname, input), 'utf8');

    let gamma;
    let epsilon;
    const count = {};
    data
        .split('\n')
        .forEach((line) => {
            line
                .split('')
                .map(n => parseInt(n, 10))
                .forEach((n, idx) => {
                    count[idx] = count[idx] || {};
                    count[idx][n] = count[idx][n] || 0;

                    count[idx][n] = count[idx][n] + 1;
                })
        });


    gamma = Object.entries(count)
        .reduce((g, [pos, c]) => {
            let mostCommonBit = Object.entries(c)
                .reduce((acc, [bit, ct], idx, a) => {
                    if (a.some(([k, v]) => v > ct)) {
                        return acc;
                    }
                    return bit;
                }, 2);

            return g + mostCommonBit;
        }, '')

    epsilon = Object.entries(count)
        .reduce((e, [pos, c]) => {
            let leastCommonBit = Object.entries(c)
                .reduce((acc, [bit, ct], idx, a) => {
                    if (a.some(([k, v]) => v < ct)) {
                        return acc;
                    }
                    return bit;
                }, 2);

            return e + leastCommonBit;
        }, '')

    console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));
}

main()
    .catch(e => (console.error(e), process.exit(1)))
