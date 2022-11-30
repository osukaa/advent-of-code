#!/usr/bin/env zx

import "zx/globals"

const internals = {};

const inputFile = argv.inputFile ?? 'inputs/day04.input'; // default entry file

const contents = await fs.readFile(path.join(__dirname, inputFile), 'utf-8');