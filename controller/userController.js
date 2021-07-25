import { pool } from '../db.js';
import * as fs from 'fs';
import * as Json from "querystring";

class UserController {
  async createUser(req, res) {
    try {
      const { email, name, surname, blank } = req.body;
      if (blank.length < 16 || blank.length > 16) {
        const errMessage = 'Wrong Insurance policy number, must be equal to 16 symbols';
        let user =
          (await pool.query('SELECT * FROM users WHERE email = $1', [email])).rows[0] || null;
        if (!user) {
          [user] = await Promise.all([pool.query(
              'INSERT INTO users (name, surname, email) values ($1, $2, $3) RETURNING *',
              [name, surname, email],
              fs.writeFileSync('..userapps/userapp.txt','новая заявка', 'utf-8', (err) => {
                if (err) console.log('Error')
              })
          )]);
        }
        let currentError =
          (await pool.query('SELECT * FROM errorslog WHERE user_email = $1', [email])).rows[0] ||
          null;
        if (!currentError) {
          currentError = (
            await pool.query(
              'INSERT INTO errorslog (status, user_email, message, error_count) values ($1, $2, $3, $4) RETURNING *',
              [422, email, errMessage, 1],
            )
          ).rows[0];
        }
        if (currentError && currentError.error_count < 3) {
          const updatedError = await pool.query(
            'UPDATE errorslog SET error_count = error_count + 1 WHERE user_email = $1 RETURNING *',
            [email],
          );
        }
        if (currentError && currentError.error_count === 3) {
          res.status(currentError.status).json({
            userEmail: currentError.user_email,
            message: errMessage,
          });
        }
        throw new Error();
      }
      const ip_ser = blank.slice(0, 10);
      const ip_num = blank.slice(11, 16);
      const newUser = await pool.query(
        'INSERT INTO users (name, surname, ip_ser, ip_num, email) values ($1, $2, $3, $4, $5) RETURNING *',
        [name, surname, ip_ser, ip_num, email],
      );
      res.json(newUser.rows);
    } catch (err) {
      console.log(err);
    }
  }

  async getOneUser(req, res) {
    try {
      const id = req.params.id;
      const all_users = await db.query('SELECT * FROM users where id = $1', [id]);
      res.json(user.rows[0]);
    } catch (err) {
      console.log(err);
      res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }
  }

  async getUsers(req, res) {
    try {
      const allUsers = await pool.query('SELECT * FROM users');
      res.json(allUsers.rows);
    } catch (err) {
      console.log(err);
      res.status(404).json({
        status: 'error',
        message: 'No users found',
      });
    }
  }

  async updateUser(req, res) {
    const { id, name, surname, ip_ser, ip_num } = req.body;
    const user = await db.query(
      'UPDATE users set name = $1, surname = $2 where id = $3 RETURNING *',
      [name, surname, id],
    );
    res.json(user.rows[0]);
  }

  async deleteUser(req, res) {
    const id = req.params.id;
    const all_users = await db.query('DELETE FROM users where id = $1', [id]);
    res.json(user.rows[0]);
  }
}

export const userController = new UserController();
