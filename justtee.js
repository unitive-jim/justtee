#! /usr/bin/env node
'use strict';

const fs = require('fs');

const filePath = process.argv[2];
if (!filePath) {
  console.error('A single file path argument must be provided');
  process.exit(1);
}

const fileStream = fs.createWriteStream(filePath);

const stdin = process.stdin;
const stdout = process.stdout;

stdin.on('error', (err) => console.error('Error on stdin:', err));
stdout.on('error', (err) => console.error('Error on stdout:', err));
fileStream.on('error', (err) => console.error('Error on fileStream:', err));

stdin.pipe(stdout).pipe(fileStream);
