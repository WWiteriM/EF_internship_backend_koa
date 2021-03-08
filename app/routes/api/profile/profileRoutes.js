const Router = require('koa-router');

const router = new Router({
    prefix: '/profile',
});

router
    .get('/:id', (ctx, next) => {
        const { params } = ctx;
        ctx.body = `GET specific profile method with params = ${JSON.stringify(params)}`;
        next();
    })
    .post('/', (ctx, next) => {
        ctx.body = 'POST profile method';
        next();
    })
    .put('/', (ctx, next) => {
        ctx.body = 'PUT profile method';
        next();
    })
    .delete('/', (ctx, next) => {
        ctx.body = 'DELETE profile method';
        next();
    });

module.exports = router;
