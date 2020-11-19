import { _baseOptions } from '../core/yargs';
import helpers from '../helpers';

exports.builder = (yargs) =>
  _baseOptions(yargs).option('force', {
    describe: 'Will drop the existing config folder and re-create it',
    type: 'boolean',
    default: false,
  }).argv;

exports.handler = async function (argv) {
  const command = argv._[0];

  switch (command) {
    case 'init':
      await initConfig(argv);
      await initMigrations(argv);
      break;

    case 'init:config':
      await initConfig(argv);
      break;

    case 'init:migrations':
      await initMigrations(argv);
      break;
  }

  process.exit(0);
};

function initConfig(args) {
  if (!helpers.config.configFileExists() || !!args.force) {
    helpers.config.writeDefaultConfig();
    helpers.view.log('Created "' + helpers.config.relativeConfigFile() + '"');
  } else {
    helpers.view.notifyAboutExistingFile(helpers.config.relativeConfigFile());
    process.exit(1);
  }
}

function initMigrations(args) {
  helpers.init.createMigrationsFolder(!!args.force);
}
