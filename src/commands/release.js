import { _baseOptions, _underscoreOption } from '../core/yargs';
import { buildRelease } from '../core/release';

import helpers from '../helpers';
import path from 'path';
import clc from 'cli-color';

exports.builder = (yargs) =>
  _underscoreOption(
    _baseOptions(yargs).option('start-date', {
      describe: 'Defines the start date for the migrations',
      type: 'string',
      demandOption: true,
    })
  ).argv;

exports.handler = function (args) {
  buildRelease(args.startDate, args.endDate);
  helpers.view.log(
    'New deploy migration was created at',
    clc.blueBright(
      path.resolve(helpers.path.getPath('migration'), '_migration.sql')
    ),
    '.'
  );

  process.exit(0);
};
