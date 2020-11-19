#!/usr/bin/env node

import getYArgs from './core/yargs';

const yargs = getYArgs();

import init from './commands/init';
import migrate from './commands/migrate';
import migrationGenerate from './commands/migration_generate';
import release from './commands/release';

import helpers from './helpers/index';

helpers.view.teaser();

yargs
  .help()
  .version()
  .command('init', 'Initializes project', init)
  .command('migrate', 'Run pending migrations', migrate)
  .command('status', 'List the status of all migrations', migrate)
  .command(
    ['create', 'migration:generate'],
    'Generates a new migration file',
    migrationGenerate
  )
  .command('release', 'Create a single migration for deploy', release)
  .wrap(yargs.terminalWidth())
  .demandCommand(1, 'Please specify a command')
  .help()
  .strict()
  .recommendCommands().argv;
