#!/usr/bin/env node

'use strict';

const fs = require('fs/promises');
const path = require('path');
const args = require('args');

args
    .option('input', 'the input file path', 'day2.input');

const flags = args.parse(process.argv);

async function main() {
    const input = flags.input;

    const data = await fs.readFile(path.resolve(__dirname, input), 'utf8');

    let posX = 0;
    let posY = 0;
    data
        .split('\n')
        .map((line) => line.split(' '))
        .forEach(([ins, amt]) => {
            switch(ins) {
                case 'forward':
                    posX += parseInt(amt, 10);
                    break;
                case 'down':
                    posY += parseInt(amt, 10);
                    break;
                case 'up':
                    posY -= parseInt(amt, 10);
                    break;
            }
        })

    console.log(posX * posY);
}

main()
    .catch(e => (console.error(e), process.exit(1)))
