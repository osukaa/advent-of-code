#!/usr/bin/env zx

const inputFile = argv.inputFile ?? 'inputs/day02.input'; // default entry file
const contents = await fs.readFile(inputFile, 'utf-8');

const results = contents
  .split('\n')
  .map((el) => {
    const [direction, units] = el.split(' ');
    return [direction.toLowerCase(), parseInt(units, 10)];
  })
  .reduce((acc, [direction, units], idx, arr) => {
    if (direction === 'forward') {
      acc.horizontal+=units;
      acc.depth+= acc.aim * units;
    }
    if (direction === 'down') {
      acc.aim+=units;
    }
    if (direction === 'up') {
      acc.aim-=units;
    }
    return acc;
  }, { horizontal: 0, depth: 0, aim: 0 });

console.log(results, results.horizontal * results.depth);