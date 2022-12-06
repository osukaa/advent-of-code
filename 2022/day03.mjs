#!/usr/bin/env zx

import "zx/globals"

const inputFile = argv.inputFile ?? 'inputs/day03.input'; // default entry file
const contents = await fs.readFile(path.join(__dirname, inputFile), 'utf-8');

const groupOf = (n) => (r, e, i) => {
  if (i % n) {
    r[r.length - 1].push(e);
  } else {
    r.push([e])
  }

  return r;
}

const priorities = (char) => {
  console.log({ char, code: char.charCodeAt(0) })
  if (char.charCodeAt(0) < 97) { // upper case
    return char.charCodeAt(0) - 38;
  }

  return char.charCodeAt(0) - 96
}

class Rucksack {
  constructor(items) {
    this.items = items.split('');
    const half = Math.floor(items.length / 2);
    this.compartmentOne = items.slice(0, half).split('');
    this.compartmentTwo = items.slice(half, items.length).split('');
    this.shared = this.compartmentOne.filter(x => this.compartmentTwo.includes(x));
  }

  errors(index) {
    console.log({ shared: this.shared, index })
    if (index >= 0) {
      return this.shared.at(index);
    }

    return this.shared;
  }

  badge(two, three, idx = 0) {
    const shared = this.items.filter(x => two.items.includes(x) && three.items.includes(x));
    return shared.at(idx);
  }
}

const splitByRucksack = (input) => input.split('\n');

const shared = splitByRucksack(contents)
.map(line => new Rucksack(line))
.reduce(groupOf(3), [])
.map(([a, b, c]) => a.badge(b, c))
.map((badge) => priorities(badge));

const result = shared.reduce((total, value) => total += value, 0);

console.log({ shared, result });

