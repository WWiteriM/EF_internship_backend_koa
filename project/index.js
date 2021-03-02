const Koa = require('koa');
const app = new Koa();

// logger
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

//response
app.use(async ctx =>{
    let obj = ctx.query;
    console.log(JSON.stringify(obj));
    ctx.body = 'Hello World';
});

app.on('error', err =>{
    console.error('server error', err)
});
console.log('Server is running on 3000 port')

app.listen(3000);
