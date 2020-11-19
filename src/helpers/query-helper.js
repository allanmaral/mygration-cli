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

    const commands = uncommentedFile
      .split(/;/g)
      .map((str) => str.trim())
      .filter((str) => !!str);

    return commands;
  },
  async runCommands(commands, sequelize) {
    const transaction = await sequelize.transaction();
    try {
      for (const cmd of commands) {
        await sequelize.query(cmd, { transaction });
      }
      // If the execution reaches this line, no errors were thrown.
      // We commit the transaction.
      await transaction.commit();
    } catch (error) {
      // If the execution reaches this line, an error was thrown.
      // We rollback the transaction.
      await transaction.rollback();
      throw error;
    }
  },
};
