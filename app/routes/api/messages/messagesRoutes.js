const Router = require('koa-router');

const router = new Router({
    prefix: '/messages',
});

router
    .get('/:id', (ctx, next) => {
        const { params } = ctx;
        ctx.body = `GET specific messages method with params = ${JSON.stringify(params)}`;
        next();
    })
    .get('/', (ctx, next) => {
        ctx.body = 'GET all messages method';
        next();
    })
    .post('/', (ctx, next) => {
        ctx.body = 'POST messages method';
        next();
    })
    .put('/', (ctx, next) => {
        ctx.body = 'PUT messages method';
        next();
    })
    .delete('/', (ctx, next) => {
        ctx.body = 'DELETE messages method';
        next();
    });

module.exports = router;
