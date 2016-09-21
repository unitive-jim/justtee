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

stdin.resume();
stdin.setEncoding('utf8');
stdin.on('data', function(data) {
  stdout.write(data);
  fileStream.write(data);
});
