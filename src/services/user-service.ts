import { SqliteService } from './sqlite-service';

const sqliteService = new SqliteService();
export class UserService {
  // 전체 내용 보기
  async allSelectTodoitem() {
    console.log('allSelectTodoitem');
    const sql = 'SELECT id, title, completed, createAt FROM todoitem';
    const r = await sqliteService.all(sql);
    if (r) {
      console.log('Read:', r);
      return r;
    }

    console.log('내용없습니다.');
    return {
      error: 'ItemNotFound',
      message: ' 해당 내용없습니다.',
    };
  }

  // 해당 아이디 내용 보기
  async oneSelectTodoitem(sid: string) {
    console.log('oneSelectTodoitem sid:', sid);
    const sql =
      'SELECT id, title, completed, createAt FROM todoitem where id=?';
    const r = await sqliteService.get(sql, sid);
    if (r) {
      console.log('Read:', r);
      return {
        view: true,
        read: r,
      };
    }

    console.log('id : ' + sid + ' 해당 내용없습니다.');
    return {
      view: false,
      error: 'ItemNotFound',
      message: sid + ' 해당 내용없습니다.',
    };
  }

  // 해당 아이디 삭제하기
  async deleteTodoitem(sid: string) {
    console.log('deleteTodoitem sid:', sid);
    // 아이디 있는지 확인
    const idchck = await this.oneSelectTodoitem(sid);
    if (idchck.view) {
      const sql = 'DELETE FROM todoitem where id=?';
      const r = await sqliteService.run(sql, sid);
      if (r) {
        console.log(sid + '삭제 완료');
        return sid + '삭제 완료';
      }
    }

    console.log('id : ' + sid + ' 해당 내용없습니다. 삭제 불가');
    return {
      error: 'ItemNotFound',
      message: sid + ' 해당 내용없습니다. 삭제 불가',
    };
  }

  // 해당 아이디 업데이트
  async updateTodoitem(sid: string, stitle: string, scompleted: boolean) {
    console.log('UpdateTodoitem sid:', sid);
    /// 아이디 있는지 확인
    const idchck = await this.oneSelectTodoitem(sid);
    if (idchck.view) {
      const sql = 'UPDATE todoitem set title=?,completed=? where id=?';
      const r = await sqliteService.run(sql, [stitle, scompleted, sid]);
      if (r) {
        const viewTodoitem = await this.oneSelectTodoitem(sid); // 업데이트 id 내용 보여주기
        console.log(sid + '업데이트 완료');
        return {
          view: sid + '업데이트 완료',
          viewTodoitem,
        };
      }
    }

    console.log('id : ' + sid + ' 해당 내용없습니다. 업데이트 불가');
    return {
      error: 'ItemNotFound',
      message: sid + ' 해당 내용없습니다. 업데이트 불가',
    };
  }

  // 아이디 저장하기
  async insertTodoitem(stitle: string) {
    const sid = Math.random().toString(36).slice(2); // 유일한 ID만들기
    const timestamp = Date.now(); // 생성 시각(밀리세컨드)
    console.log('insertTodoitem sid:', sid);
    const sql =
      'insert into todoitem ( id, title, completed, createAt) values (?,?,?,?)';
    const r = await sqliteService.run(sql, [sid, stitle, true, timestamp]);
    if (r) {
      const viewTodoitem = await this.oneSelectTodoitem(sid); // 입력한 id 내용 보여주기
      console.log('id : ' + sid + ' 저장 완료');
      return {
        view: sid + '저장 완료',
        viewTodoitem,
      };
    }

    console.log('id : ' + sid + ' 저장 실패.');
    return {
      error: 'ItemNotFound',
      message: sid + ' 저장 실패.',
    };
  }
}
