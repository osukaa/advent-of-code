#!/usr/bin/env zx

import "zx/globals"

const inputFile = argv.inputFile ?? 'inputs/day01.input'; // default entry file
const contents = await fs.readFile(path.join(__dirname, inputFile), 'utf-8');

const internals = {};

internals.splitByElf = (input) => input.split('\n\n');

const caloriesPerElf = internals.splitByElf(contents);

const sortedElves = caloriesPerElf
  .map(calories => calories
    .split('\n')
    .map(c => parseInt(c, 10))
    .reduce((total, value) => total + value, 0))
  .sort((a, b) => b - a);

const [one, two, three] = sortedElves;

console.log(sortedElves, one + two + three);