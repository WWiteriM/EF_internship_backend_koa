const Koa = require('koa');

const { PORT } = process.env;
const app = new Koa();

// response
app.use(async (ctx) => {
  const obj = JSON.stringify(ctx.query);
  ctx.body = `Hello World, your parameters are ${obj}`;
});

console.log('New branch was created');
app.listen(PORT);
