import * as sqlite from 'sqlite3';

const sqlite3 = sqlite.verbose();
const db: sqlite.Database = new sqlite3.Database('./src/db/service.db');

export class SqliteService {
  async all(query: string) {
    return new Promise(function (resolve) {
      db.all(query, [], function (error, rows) {
        resolve(rows);
      });
    });
  }

  async get(query: string, parameters: any) {
    return new Promise(function (resolve) {
      db.get(query, parameters, function (error, row) {
        resolve(row);
      });
    });
  }

  async run(query: string, parameters: any) {
    return new Promise(function (resolve, reject) {
      db.run(query, parameters, function (error) {
        if (error) reject(error.message);
        else resolve(true);
      });
    });
  }
}
