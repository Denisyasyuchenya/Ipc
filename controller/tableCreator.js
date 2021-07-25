import { pool } from '../db.js';
import fs from 'fs';

const queryPaths = {
  operators: './sql/operators.sql',
  users: './sql/users.sql',
  errors: './sql/errors.sql',
};

export function loadQuery(path) {
  const sql = fs.readFileSync(path, { encoding: 'utf-8' });
  return sql;
}

export async function tableCreator() {
  try {
    const userSQL = loadQuery(queryPaths.operators);
    const operatorsSQL = loadQuery(queryPaths.users);
    const errorSQL = loadQuery(queryPaths.errors);
    const userTable = await pool.query(userSQL);
    const operatorsTable = await pool.query(operatorsSQL);
    const errorsTable = await pool.query(errorSQL);
  } catch (err) {
    console.log(err);
  }
}
