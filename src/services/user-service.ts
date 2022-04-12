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
        if (rows) {
          console.log(rows);
        } else {
          console.log('ItemNotFound');
        }
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

  // 해당 아이디 업데이트
  async updateTodoitem(sid: string, stitle: string, scompleted: boolean) {
    console.log('UpdateTodoitem sid:', sid);
    db.run(
      'UPDATE todoitem set title=?,completed=? where id=?',
      [stitle, scompleted, sid],
      (_error: string) => {
        if (_error) {
          console.log('RequestFailed' + _error);
          return {
            error: 'RequestFailed',
            message: _error,
          };
        }

        console.log(sid + ' 업데이트 완료');
      }
    );
    return sid + '업데이트';
  }

  // 아이디 저장하기
  async insertTodoitem(stitle: string) {
    const sid = Math.random().toString(36).slice(2); // 유일한 ID만들기
    const timestamp = Date.now(); // 생성 시각(밀리세컨드)
    console.log('insertTodoitem sid:', sid);
    db.run(
      'insert into todoitem ( id, title, completed, createAt) values (?,?,?,?)',
      [sid, stitle, true, timestamp],
      (_error: string) => {
        if (_error) {
          console.log('RequestFailed' + _error);
        }
      }
    );
    return {
      id: sid,
      title: stitle,
    };
  }
}
