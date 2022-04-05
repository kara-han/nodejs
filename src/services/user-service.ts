import * as sqlite from 'sqlite3';

const sqlite3 = sqlite.verbose();
const db: sqlite.Database = new sqlite3.Database('./src/db/service.db');

export class UserService {
  // 전체 내용 보기
  async allSelectTodoitem() {
    console.log('allSelectTodoitem');
    db.all(
      'SELECT id, title, completed, createAt FROM todoitem',
      [],
      (_error: string, rows: any) => {
        console.log(rows);
      }
    );
    return 'allSelectTodoitem';
  }

  // 해당 아이디 내용 보기
  async oneSelectTodoitem(sid: string) {
    console.log('oneSelectTodoitem sid:', sid);
    db.get(
      'SELECT id, title, completed, createAt FROM todoitem where id=?',
      sid,
      (_error: string, rows: any) => {
        if (!rows) {
          console.log('ItemNotFound');
        }

        console.log(rows);
      }
    );
    return {
      id: sid,
    };
  }

  // 해당 아이디 삭제하기
  async deleteTodoitem(sid: string) {
    console.log('deleteTodoitem sid:', sid);
    db.run('DELETE FROM todoitem where id=?', sid, (_error: string) => {
      if (_error) {
        console.log('RequestFailed' + _error);
        return {
          error: 'RequestFailed',
          message: _error,
        };
      }

      console.log(sid + ' 삭제 완료');
    });
    return sid + '삭제';
  }

  // 아이디 저장하기
  async insertTodoitem(
    sid: string,
    stitle: string,
    scompleted: boolean,
    screateAt: number
  ) {
    console.log('insertTodoitem sid:', sid);
    db.run(
      'insert into todoitem ( id, title, completed, createAt) values (?,?,?,?)',
      [sid, stitle, scompleted, screateAt],
      (_error: string) => {
        if (_error) {
          console.log('RequestFailed' + _error);
        }
      }
    );
    return {
      id: sid,
      title: stitle,
      completed: scompleted,
      createAt: screateAt,
    };
  }
}
