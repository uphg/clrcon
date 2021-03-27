#!/usr/bin/env node
const { program } = require('commander');
const pkg = require('./package.json')
const api = require('./index.js')

if (process.argv.length <= 2) {
  api.clearLog()
} else {
  program
    .version(pkg.version, '-v, --version', 'display version information')
  program
    .option('-a, --assign <strong...>', 'specify directory')
  program.parse();

  const assign = program.opts().assign
  api.clearLog(...assign)
}



