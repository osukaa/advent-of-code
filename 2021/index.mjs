#!/usr/bin/env zx

const dayFile = argv._[0] ?? 'day01';

await $`zx ./${dayFile}.mjs`;