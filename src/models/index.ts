import { Options } from 'body-parser';
import { Sequelize } from 'sequelize';
import config from '../config/config';


const dbconfig = process.env.NODE_ENV === 'development' ? config.development : config.production;
let db = new Sequelize(dbconfig.database as string, dbconfig.username as string, dbconfig.password, {
  host: dbconfig.host,
  dialect: "mysql",
});


export default db;
