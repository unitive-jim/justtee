#! /usr/bin/env node
'use strict';

const a = process.argv[2];
const N = a ? parseInt(a, 10) : 100000;

const ten = '0123456789';
const fifty = ten + ten + ten + ten + ten;
const line = fifty + fifty + '\n';

for (let i=0; i<N; i++) {
  const now = new Date();
  process.stdout.write(now.toISOString() + ' ' + line);
}

