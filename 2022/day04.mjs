#!/usr/bin/env zx

import "zx/globals"

const inputFile = argv.inputFile ?? 'inputs/day04.input'; // default entry file
const contents = await fs.readFile(path.join(__dirname, inputFile), 'utf-8');

const splitByPairs = (input) => input.split('\n');

const splitByElf = (input) => input.split(',');

const mapStartEnd = (input) => input.split('-').map((e) => parseInt(e, 10))

const isContained = (assignmentOne, assignmentTwo) => {
  const [startFirst, endFirst] = mapStartEnd(assignmentOne);
  const [startSecond, endSecond] = mapStartEnd(assignmentTwo);

  console.log({ startFirst, startSecond, finishFirst: endFirst, finishSecond: endSecond })

  if (startFirst <= startSecond && endSecond <= endFirst) {
    console.log({ startFirst, startSecond, finishFirst: endFirst, finishSecond: endSecond })
    return true;
  }

  if (startSecond <= startFirst && endFirst <= endSecond) {
    console.log({ startFirst, startSecond, finishFirst: endFirst, finishSecond: endSecond })
    return true;
  }

  console.log({ startFirst, startSecond, finishFirst: endFirst, finishSecond: endSecond, isContained: false })
  return false;
}

const isNotOverlaped = (assignmentOne, assignmentTwo) => {
  const [startFirst, endFirst] = mapStartEnd(assignmentOne);
  const [startSecond, endSecond] = mapStartEnd(assignmentTwo);

  if ((startFirst < startSecond && endFirst < startSecond) || (startFirst > endSecond && endFirst > endSecond)) {
    return true;
  }

  return false;
}

const assignments = splitByPairs(contents)
.map((line) => splitByElf(line))
.filter(([one, two]) => !isNotOverlaped(one, two));

console.log({ assignments, count: assignments.length });