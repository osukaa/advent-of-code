#!/usr/bin/env zx

import "zx/globals"

const inputFile = argv.inputFile ?? 'inputs/day06.input'; // default entry file
const contents = await fs.readFile(path.join(__dirname, inputFile), 'utf-8');

const groupByStartOf = (count) => (char, idx, arr) => {
  const marker = [char];

  for (let i = idx + 1; i < idx + count; i++) {
    marker.push(arr.at(i));
  }

  if (marker.every(c => c)) {
    return [marker.join(''), idx, idx + count];
  }
};

const results = contents
  .split('')
  .map(groupByStartOf(14))
  .filter((result) => result)
  .filter(([marker]) => {
    return !marker.split('').some((v, i, a) => {
      return a.lastIndexOf(v) != i;
    });
  });

console.log({ results });