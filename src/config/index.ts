require('dotenv').config({
  path: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
});

export const portServer = process.env.PORT || 3000;
export const env = process.env.NODE_ENV;
export const { DB_NAME } = process.env;
export const BASE_URL = `${process.env.BASE_URL}`;
