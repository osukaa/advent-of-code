#!/usr/bin/env zx

import "zx/globals"

const internals = {};

const inputFile = argv.inputFile ?? 'inputs/day04.input'; // default entry file

const contents = await fs.readFile(path.join(__dirname, inputFile), 'utf-8');

internals.Board = class Board {
  constructor(str) {
    this.marked = Array(5).fill(null).map(() => Array(5).fill(false, 0), 0);
    this.numbers = str
      .split('\n') //rows
      .map((row) => row.split(' ').filter((el) => el)); //columns
  }

  mark(called) {
    for (let row = 0; row < 5; row++) {
      for (let column = 0; column < 5; column++) {
        if (this.numbers[row][column] === called) {
          this.marked[row][column] = true;
        }
      }
    }
  }

  bingo() {
    // horizontal
      for (let row = 0; row < 5; row++) {
        rows: {
          for (let column = 0; column < 5; column++) {
            if (!this.marked[row][column]) {
              break rows;
            }
          }
          return true;
        }
      }

    //vertical
      for (let column = 0; column < 5; column++) {
        columns: {
          for (let row = 0; row < 5; row++) {
            if (!this.marked[row][column]) {
              break columns;
            }
          }
          return true;
        }
      }
      return false;
  }

  score(final) {
    final = parseInt(final, 10);
    let sum = 0;
    for (let row = 0; row < 5; row++) {
      for (let column = 0; column < 5; column++) {
        if (!this.marked[row][column]) {
          sum += parseInt(this.numbers[row][column], 10);
        }
      }
    }

    console.log('sum: ', sum, 'called: ', final, this.marked, this.numbers);
    return sum * final;
  }
}

internals.splitInput = (input) => input.split('\n\n');

internals.createBoard = (input) => new internals.Board(input);

const [numberDraw, ...rest] = internals.splitInput(contents);

let boards = rest.map(internals.createBoard);

const called = numberDraw.split(',');

called.forEach((call, idx) => {
  for (const board of boards) {
    board.mark(call);
    if (board.bingo()) {
      console.log('last call: ', call, 'score: ', board.score(call));
      break;
    }
  }
});

boards = rest.map(internals.createBoard);
const won = Array(boards.length).fill(false, 0);

console.log({won, len: won.length})

called.forEach((call, idx) => {
  boards.forEach((board, i) => {
    if (won[i]) {
      return true;
    }
    board.mark(call);
    if (board.bingo()) {
      won[i] = true;
      if (won.every(el => el)) {
        console.log('last call: ', call, 'score: ', board.score(call), 'won: ', won);
        return false;
      }
    }
  })
});