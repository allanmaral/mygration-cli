import fs from 'fs';
import path from 'path';

import helpers from '../helpers/index';

export function buildRelease(startDate, endDate) {
  const migrationsDir = helpers.path.getPath('migration');
  const start = helpers.date.parse(startDate);
  const end = helpers.date.parse(endDate);
  const config = helpers.config.readConfig();

  const files = fs.readdirSync(migrationsDir);
  const migrations = files
    .filter((file) => file.match(helpers.migration.getFileSelector()))
    .filter((file) => {
      const date = helpers.date.fromName(file);
      return date >= start && (!end || date <= end);
    })
    .map((file) => {
      const sql = fs.readFileSync(path.resolve(migrationsDir, file));
      return splitMigration(file, String(sql));
    });

  const migrationBlocks = migrations.reduce((result, file) => {
    for (const key in file) {
      if (key === '_name') continue;
      const previous = result[key] || '';
      result[key] =
        previous +
        // `-- FILE: ${file._name}` +
        `\n${file[key]}` +
        // `\n-- END OF FILE: ${file._name}\n` +
        `\n`;
    }
    return result;
  }, {});

  const appendUseCommand = !!config.database;
  const prefixCommand = appendUseCommand ? `USE ${config.database};\n\n` : '';

  const sql = Object.entries(migrationBlocks)
    .sort(([a], [b]) => a.localeCompare(b))
    .reduce((result, [block, commands]) => {
      const blockName = `#### ${block} ####`;
      const separator = Array(blockName.length).fill('#').join('');
      const blockSQL = `-- ${separator}\n-- ${blockName}\n-- ${separator}\n${commands}\n`;
      return result + blockSQL;
    }, prefixCommand);

  fs.writeFileSync(path.resolve(migrationsDir, '_migration.sql'), sql);
}

function splitMigration(name, sqlFile) {
  const blockHeaderRegExp = /--[ #]*\r{0,1}\n--[ #]*([^#]+)[ #]*\r{0,1}\n--[ #]*\r{0,1}\n/;
  const blocks = sqlFile
    .split(blockHeaderRegExp)
    .map((str) => str.trim())
    .filter((str) => !!str);

  const file = { _name: name };

  for (let i = 0; i < blocks.length; i += 2) {
    file[blocks[i]] = blocks[i + 1];
  }

  return file;
}
