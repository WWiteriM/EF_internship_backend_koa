const Router = require('koa-router');

const router = new Router({
    prefix: '/photos',
});

router
    .get('/:id', (ctx, next) => {
        const { params } = ctx;
        ctx.body = `GET specific photos method with params = ${JSON.stringify(params)}`;
        next();
    })
    .get('/', (ctx, next) => {
        ctx.body = 'GET all photos method';
        next();
    })
    .post('/', (ctx, next) => {
        ctx.body = ' POST photos method';
        next();
    })
    .put('/', (ctx, next) => {
        ctx.body = 'PUT photos method';
        next();
    })
    .delete('/', (ctx, next) => {
        ctx.body = 'DELETE photos method';
        next();
    });

module.exports = router;
