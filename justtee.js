#! /usr/bin/env node
'use strict';

const fs = require('fs');
const P = require('bluebird');

const filePath = process.argv[2];
if (!filePath) {
  console.error('A single file path argument must be provided');
  process.exit(1);
}

const fileStream = fs.createWriteStream(filePath);

const stdin = process.stdin;
const stdout = process.stdout;

const fileWriteP = P.promisify(fileStream.write, { context: fileStream });
const stdoutWriteP = P.promisify(stdout.write, { context: stdout });

stdin.setEncoding('utf8');
stdin.resume();
stdin.on('data', (data) => {
  stdin.pause();
  P.join(fileWriteP(data), stdoutWriteP(data), () => stdin.resume());
});

stdin.on('error', (err) => console.error('Error on stdin:', err));
stdout.on('error', (err) => console.error('Error on stdout:', err));
fileStream.on('error', (err) => console.error('Error on fileStream:', err));
