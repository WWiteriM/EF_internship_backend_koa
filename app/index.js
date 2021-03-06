const Koa = require('koa');

const app = new Koa();
const { PORT } = process.env;

const notes = require('./routes/api/notes/notesRoutes.js');
const pets = require('./routes/api/pets/petsRoutes.js');

app.use(notes.routes()).use(notes.allowedMethods());
app.use(pets.routes()).use(pets.allowedMethods());

app.listen(PORT);
