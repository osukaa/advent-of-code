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

    let idx = 0;
    let con = true;
    let oxygen = data.split('\n');
    while (con) {
        const most = oxygen.reduce((acc, line) => {
            const i = parseInt(line[idx], 10);
            acc[i]++;
            return acc;
        }, [0, 0])
            .reduce((zero, one) => {
                if (zero > one) {
                    return '0';
                }
                if (one > zero) {
                    return '1';
                }
                return '1';
            })

        oxygen = oxygen
            .filter((line) => {
                return line[idx] === most;
            });

        switch(oxygen.length) {
            case 0:
                con = false;
                break;
            case 1:
                con = false;
                oxygen = oxygen.pop();
                break;
            default:
                idx++;
                break;
        }
    }

    idx = 0;
    con = true;
    let scrubber = data.split('\n');
    while (con) {
        const least = scrubber.reduce((acc, line) => {
            const i = parseInt(line[idx], 10);
            acc[i]++;
            return acc;
        }, [0, 0])
            .reduce((zero, one) => {
                if (zero < one) {
                    return '0';
                }
                if (one < zero) {
                    return '1';
                }
                return '0';
            })

        scrubber = scrubber
            .filter((line) => {
                return line[idx] === least;
            });

        switch(scrubber.length) {
            case 0:
                con = false;
                break;
            case 1:
                con = false;
                scrubber = scrubber.pop();
                break;
            default:
                idx++;
                break;
        }
    }

    console.log(parseInt(oxygen, 2) * parseInt(scrubber, 2));
}

main()
    .catch(e => (console.error(e), process.exit(1)))
