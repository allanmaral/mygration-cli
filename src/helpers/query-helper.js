import fs from 'fs';

module.exports = {
  resolver(sequelize) {
    return (path) => {
      const commands = this.parseSQL(path);
      return {
        up: () => this.runCommands(commands, sequelize),
      };
    };
  },
  parseSQL(path) {
    const sqlFile = fs.readFileSync(path, 'utf8');

    const uncommentedFile = sqlFile
      .replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g, '')
      .replace(/--.+\r{0,1}\n/g, '');

    const commands = [uncommentedFile.trim()];

    return commands;
  },
  async runCommands(commands, sequelize) {
    await sequelize.transaction(async (transaction) => {
      for (const cmd of commands) {
        await sequelize.query(cmd, { transaction });
      }
    });
  },
};
