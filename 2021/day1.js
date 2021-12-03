#!/usr/bin/env node

'use strict';

const fs = require('fs/promises');
const path = require('path');
const args = require('args');

args
    .option('input', 'the input file path', 'day1.input');

const flags = args.parse(process.argv);

async function main() {
    const input = flags.input;

    const data = await fs.readFile(path.resolve(__dirname, input), 'utf8');

    let increased = 0;
    let decreased = 0;
    data
        .split('\n')
        .map(e => parseInt(e, 10))
        .forEach((line, idx, a) => {
            if (idx > 0) {
                const prior = a[idx - 1];
                if (line - prior > 0) {
                    increased++;
                }
                if (line - prior < 0) {
                    decreased++;
                }
            }
        });

    console.log(increased, decreased);
}

main()
.catch(e => (console.error(e), process.exit(1)))
