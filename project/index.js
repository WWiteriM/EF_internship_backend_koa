const Koa = require('koa');
const app = new Koa();

//response
app.use(async ctx =>{
    let obj = JSON.stringify(ctx.query);
    ctx.body = `Hello World, your parameters are ${obj}`;
});

app.listen(3000);
