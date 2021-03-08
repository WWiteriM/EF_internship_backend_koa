const Router = require('koa-router');

const router = new Router({
    prefix: '/friends',
});

router
    .get('/:id', (ctx, next) => {
        const { params } = ctx;
        ctx.body = `GET specific friends method with params = ${JSON.stringify(params)}`;
        next();
    })
    .get('/', (ctx, next) => {
        ctx.body = 'GET all friends method';
        next();
    })
    .post('/', (ctx, next) => {
        ctx.body = 'POST friends method';
        next();
    })
    .put('/', (ctx, next) => {
        ctx.body = 'PUT friends method';
        next();
    })
    .delete('/', (ctx, next) => {
        ctx.body = 'DELETE friends method';
        next();
    });

module.exports = router;
