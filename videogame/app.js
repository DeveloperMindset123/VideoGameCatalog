import express, { urlencoded } from 'express';
import { connect, connection } from 'mongoose';
import methodOverride from 'method-override';
import { join } from 'path';
import videoGame, { find, findById, findByIdAndUpdate, findByIdAndDelete } from './models/games';
import ejsMate from 'ejs-mate';


connect('mongodb://localhost:27017/video-game', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const db = connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const app = express();
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'))

app.use(urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home')
})
app.get('/videogames', async (req, res) => {
    const videogames = await find({});
    res.render('videogames/index', { videogames });

})

app.get('/videogames', async (req, res) => {
    const videogames = await find({});
    res.render('videogames/index', { videogames });

})

app.get('/videogames/new', (req, res,) => {
    res.render('videogames/new');
});

app.post('/videogames', async (req, res) => {
    const newGame = new videoGame(req.body.videogame);
    await newGame.save();
    res.redirect('/videogames');
});

app.get('/videogames/:id', async (req, res,) => {
    const videogame = await findById(req.params.id)
    res.render('videogames/show', { videogame });
});

app.get('/videogames/:id/edit', async (req, res) => {
    const videogame = await findById(req.params.id);
    res.render('videogames/edit', { videogame });
});

app.put('/videogames/:id', async (req, res) => {
    const { id } = req.params;
    await findByIdAndUpdate(id, req.body.videogame);
    res.redirect(`/videogames/${id}`);
});

app.delete('/videogames/:id', async (req, res) => {
    const { id } = req.params;
    await findByIdAndDelete(id);
    res.redirect('/videogames');
})

app.listen(3000, () => {
    console.log('port 3000')
})