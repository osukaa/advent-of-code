#!/usr/bin/env zx

const inputFile = argv.inputFile ?? 'inputs/day03.input'; // default entry file
const contents = await fs.readFile(inputFile, 'utf-8');

const splitInput = (input) => input.split('\n').map((binarynumber) => binarynumber.split(''));

const countPerNumber = (input) => input.reduce((acc, binary) => {
  binary.forEach((value, idx) => {
    if (value === '0') {
      acc[idx].zero++;
    }
    if (value === '1') {
      acc[idx].one++;
    }
  });
  return acc;
}, Array(5).fill('', 0).map(() => ({ zero: 0, one: 0 })));

const countGamma = (input) => input.map(({ zero, one }) => {
  if (zero > one) {
    return '0'
  }
  if (zero < one) {
    return '1'
  }
});

const countEpsilon = (input) => input.map(({ zero, one }) => {
  if (zero < one) {
    return '0'
  }
  if (zero > one) {
    return '1'
  }
});

let idx = 0;
let oxygen =  splitInput(contents);
let count = countPerNumber(oxygen);

while (oxygen.length > 1) {
  oxygen = oxygen.filter((binary) => {
    if (count[idx].zero > count[idx].one) {
      return binary[idx] === '0';
    }

    return binary[idx] === '1';
  });
  count = countPerNumber(oxygen);
  idx+=1;
}

idx = 0;
let co2 =  splitInput(contents);
count = countPerNumber(co2);

while (co2.length > 1) {
  console.log({ co2, count, idx });
  co2 = co2.filter((binary) => {
    if (count[idx].one < count[idx].zero) {
      return binary[idx] === '1';
    }

    return binary[idx] === '0';
  });
  count = countPerNumber(co2);
  idx+=1;
}

const [oxygenNumber] = oxygen;
const [co2Number] = co2;

console.log(parseInt(oxygenNumber.join(''), 2) * parseInt(co2Number.join(''), 2));