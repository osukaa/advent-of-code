#!/usr/bin/env zx

const inputFile = argv.inputFile ?? 'inputs/day01.input'; // default entry file
const contents = await fs.readFile(inputFile, 'utf-8');

const results = contents
  .split('\n')
  .map(el => parseInt(el, 10))
  .map((first, idx, arr) => {
    const second = arr[idx+1];
    const third = arr[idx+2];
    if (first && second && third) {
      return first + second + third;
    }
  })
  .reduce((acc, value, idx, arr) => {
    if (idx > 0) {
      const delta = value - arr[idx -1 ];

      if (delta > 0) {
        acc.increased++;
      }
      if (delta < 0) {
        acc.decreased++;
      }
    }

    return acc;
  }, { increased: 0, decreased: 0 });

console.log(results);
