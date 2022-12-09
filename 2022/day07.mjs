#!/usr/bin/env zx

import "zx/globals"

const folderSize = (path, contents, entries) => {
  return contents.reduce((acc, item) => {
    if (item.startsWith('dir')) {
      // subdirectory
      const subdir = item.slice(4).trim();
      const subdirpath = `${path}.${subdir}`;
      const subdirsize = folderSize(subdirpath, entries.get(subdirpath), entries);
      return acc += subdirsize;
    }

    const [size] = item.split(' ');
    acc += parseInt(size, 10);
    return acc;
  }, 0);
}

const inputFile = argv.inputFile ?? 'inputs/day07.input'; // default entry file
const contents = await fs.readFile(path.join(__dirname, inputFile), 'utf-8');

const paths = new Set();
const folderContents = new Map();

const filesystem = contents
  .split('\n')
  .map((line) => line.startsWith('$') ? { command: line } : { output: line })
  .reduce((state, { command, output }) => {
    if (command && command.startsWith('$ cd')) {
      const folderName = command.slice(4).trim();
      if (folderName !== '..') {
        state.current.push(folderName);
        state.last = 'cd';
        paths.add(state.current.join('.'));
      } else {
        state.current.pop();
      }
    }
    if (command && command.startsWith('$ ls')) {
      state.last = 'ls';
      folderContents.set(state.current.join('.'), []);
    }
    if (output && state.last === 'ls') {
      const fcontents = folderContents.get(state.current.join('.'));
      fcontents.push(output);
      folderContents.set(state.current.join('.'), fcontents);
    }

    return state;
  }, { current: [] });

const dirSizes = new Map();
for (const [dirPath, contents] of folderContents.entries()) {
  const dirSize = folderSize(dirPath, contents, folderContents);
  dirSizes.set(dirPath, dirSize);
}

// part1
const part1 = Array.from(dirSizes.entries())
  .filter(([dir]) => dir !== '/')
  .filter(([, dirSize]) => dirSize < 100000)
  .reduce((total, [, dirSize]) => total += dirSize, 0);

console.log({ filesystem, paths, folderContents, dirSizes, part1 });

// part2
const TOTAL_DISK_SPACE = 70000000;
const MIN_FREE_SPACE = 30000000;
const rootDirSize = dirSizes.get('/');
const unusedSpace = TOTAL_DISK_SPACE - rootDirSize;
const spaceToFree = MIN_FREE_SPACE - unusedSpace;

const [[part2, part2Size]] = Array.from(dirSizes.entries())
  .filter(([, dirSize]) => dirSize >= spaceToFree)
  .sort(([, dirSizeA], [,dirSizeB]) => dirSizeA - dirSizeB);

console.log({ spaceToFree, unusedSpace, rootDirSize, part2, part2Size });