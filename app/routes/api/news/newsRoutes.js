const Router = require('koa-router');

const router = new Router({
    prefix: '/news',
});

router
    .get('/:id', (ctx, next) => {
        const { params } = ctx;
        ctx.body = `GET specific news method with params = ${JSON.stringify(params)}`;
        next();
    })
    .get('/', (ctx, next) => {
        ctx.body = 'GET all news method';
        next();
    })
    .post('/', (ctx, next) => {
        ctx.body = 'POST news method';
        next();
    })
    .put('/', (ctx, next) => {
        ctx.body = 'PUT news method';
        next();
    })
    .delete('/', (ctx, next) => {
        ctx.body = 'DELETE news method';
        next();
    });

module.exports = router;
