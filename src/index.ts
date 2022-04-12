import 'reflect-metadata'; // Decorator 를 사용하는 라이브러리에서 필요할 경우
import process from 'node:process';
import Koa from 'koa';
import Router from 'koa-router';
import koaBody from 'koa-bodyparser';
import { UserService } from './services/user-service';

interface TodoItem {
  id: string; // 유니크 아이디
  title: string; // 제목
  completed: boolean; // 완료 여부
  createAt: number; // 생성 시각(밀리세컨드)
}
const app = new Koa();
const router = new Router();

app.use(koaBody());

// 전체 내용 보기
router.get('/api/todos/', async (ctx) => {
  const userService = new UserService();
  const user = await userService.allSelectTodoitem();
  ctx.body = user;
});

// 해당 아이디 내용 보기
router.get('/api/todos/:id', async (ctx) => {
  const { id } = ctx.params;
  const userService = new UserService();
  const user = await userService.oneSelectTodoitem(id);
  ctx.body = user;
});

// 해당 아이디 삭제하기
router.delete('/api/todos/:id', async (ctx) => {
  const { id } = ctx.params;
  const userService = new UserService();
  const user = await userService.deleteTodoitem(id);
  ctx.body = user;
});

// 해당 아이디 업데이트
router.put('/api/todos/:id', async (ctx) => {
  const { id } = ctx.params;
  const postuser = ctx.request.body as TodoItem;
  const stitle = postuser.title;
  const scompleted = postuser.completed;
  const userService = new UserService();
  const user = await userService.updateTodoitem(id, stitle, scompleted);
  ctx.body = user;
});

// 아이디 저장하기
router.post('/api/todos/', async (ctx) => {
  const postuser = ctx.request.body as TodoItem;
  const stitle = postuser.title;
  const userService = new UserService();
  const user = await userService.insertTodoitem(stitle);
  ctx.body = user;
});

app.use(router.routes());

const port = process.env.PORT ?? 8080;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
