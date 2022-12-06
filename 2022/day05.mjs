#!/usr/bin/env zx

import "zx/globals"

const inputFile = argv.inputFile ?? 'inputs/day05.input'; // default entry file
const contents = await fs.readFile(path.join(__dirname, inputFile), 'utf-8');

// day03.mjs
const groupOf = (n) => (r, e, i) => {
  if (i % n) {
    r[r.length - 1].push(e);
  } else {
    r.push([e])
  }

  return r;
}

const moveRegex = new RegExp(/move (\d+) from (\d+) to (\d+)/);

const splitInitialPlan = (input) => input.split('\n\n');

const splitByStackLayer = (input) => input.split('\n');

const splitByStack = (input) => input.split('');

const part1Moves = (stacks) => ([times, from, to]) => {
  for (let i = 0; i < times; i++) {
    stacks[to - 1].push(stacks[from - 1].pop());
  }
};

const part2Moves = (stacks) => ([times, from, to]) => {
  const queues = [];
	for (let i = 0; i < times; i++) {
		queues.push(stacks[from - 1].pop());
	}
	queues.reverse().forEach((a) => stacks[to - 1].push(a));
}

let [stacks, plan] = splitInitialPlan(contents);

console.log({stacks, plan});

stacks = splitByStackLayer(stacks)
  .map((layer) => splitByStack(layer))
  .map((stack) => stack.reduce(groupOf(4), []))
  .map((a) => a.map((b) => b[1]))
  .reverse();

stacks = stacks[0].map((_, idx) => stacks.map((row) => row[idx])); 
stacks = stacks.map((a) => a.filter((b) => b !== " "));

console.log({ stacks });

plan
  .trim()
  .split('\n')
  .map((a) => moveRegex.exec(a))
  .map(([,times, from, to]) => [parseInt(times, 10), parseInt(from, 10), parseInt(to, 10)])
  .forEach(part2Moves(stacks));

console.log(stacks.map((a) => a[a.length - 1]).join(''));
