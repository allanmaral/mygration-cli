import Sequelize from 'sequelize';
import sequelizeInfo from 'sequelize/package.json';

import getYArgs from '../core/yargs';

const args = getYArgs().argv;

const generic = {
  getEnvironment: () => {
    return args.env || process.env.NODE_ENV || 'development';
  },

  getSequelize: (file) => {
    if (!file) return Sequelize;
    else return sequelizeInfo;
  },

  execQuery: (sequelize, sql, options) => {
    if (sequelize.query.length === 2) {
      return sequelize.query(sql, options);
    } else {
      return sequelize.query(sql, null, options);
    }
  },
};

module.exports = generic;
module.exports.default = generic;
