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

function errHandler(name, err) {
  console.error(name, err);
  process.exit(1);
}

stdin.on('error', (err) => errHandler('stdin', err));
stdout.on('error', (err) => errHandler('stdout', err));
fileStream.on('error', (err) => errHandler('fileStream', err));

stdin.pipe(stdout);
stdin.pipe(fileStream);
