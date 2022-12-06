#!/usr/bin/env zx

import "zx/globals"

const inputFile = argv.inputFile ?? 'inputs/day02.input'; // default entry file
const contents = await fs.readFile(path.join(__dirname, inputFile), 'utf-8');

const p1Choices = new Map([
  ['A', 'rock'],
  ['B', 'paper'],
  ['C', 'scissors'],
]);

const p2Choices = new Map([
  ['X', 'rock'],
  ['Y', 'paper'],
  ['Z', 'scissors'],
]);

const p2Arranged = {
  X: {
    'A': 'Z',
    'B': 'X',
    'C': 'Y',
  },
  Y: {
    'A': 'X',
    'B': 'Y',
    'C': 'Z',
  },
  Z: {
    'A': 'Y',
    'B': 'Z',
    'C': 'X',
  }
}

const choicePoints = new Map([
  ['rock', 1],
  ['paper', 2],
  ['scissors', 3],
]);

const splitStrategyByRound = (input) => input.split('\n');

const letterToChoice = (p1, p2) => [p1Choices.get(p1), p2Choices.get(p2)];

const arrangeResult = (p1, p2) => [p1, p2Arranged[p2][p1]];

const determineResult = (p1, p2) => {
  // TIE
  if (p1 === p2) {
    return { p1, p2, result: 3, choice: choicePoints.get(p2) };
  }

  // LOSE
  if (p1 === 'rock' && p2 === 'scissors') {
    return { p1, p2, result: 0, choice: choicePoints.get(p2) };
  }
  if (p1 === 'paper' && p2 == 'rock') {
    return { p1, p2, result: 0, choice: choicePoints.get(p2) };
  }
  if (p1 === 'scissors' && p2 === 'paper') {
    return { p1, p2, result: 0, choice: choicePoints.get(p2) };
  }

  // WIN
  if (p1 === 'scissors' && p2 === 'rock') {
    return { p1, p2, result: 6, choice: choicePoints.get(p2) };
  }
  if (p1 === 'rock' && p2 == 'paper') {
    return { p1, p2, result: 6, choice: choicePoints.get(p2) };
  }
  if (p1 === 'paper' && p2 === 'scissors') {
    return { p1, p2, result: 6, choice: choicePoints.get(p2) };
  }
}

// a rock 1, b paper 2, c scissors 3
// x rock 1, y paper 2, z scissors 3
// pt2: x lose, y draw, z win

const rounds = splitStrategyByRound(contents);

console.log({ rounds })

const roundResults = rounds
  .map((round) => round.split(' '))
  .map(([p1, p2]) => arrangeResult(p1, p2))
  .map(([p1, p2]) => letterToChoice(p1, p2))
  .map(([p1, p2]) => determineResult(p1, p2));

const total = roundResults.reduce((total, { result, choice, p1, p2 }) => {
  console.log({ total, result, choice, p1, p2 });
  total += result;
  total += choice;
  return total;
}, 0)

console.log({ roundResults, total });
