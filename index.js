const http = require('http'),
    path = require('path'),
    express = require('express'),
    jwt = require('jsonwebtoken'),
    jwt_middleware = require('express-jwt'),
    Usuario = require('./model/Usuario'),
    app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const jwtKey = 'senha';

const { MongoClient } = require("mongodb");

const uri =
    "mongodb+srv://user:4ghMVoB0oZnHbJ5X@projeto-web.66aaexz.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
async function run() {
    try {
        const database = client.db('VanGogh');
        const usuarios = database.collection('Usuarios');
        const usuario = await usuarios.find().toArray();
        console.log('O banco de dados conectou! Este foi o usuario encontrado: ', usuario);
    } finally {
        await client.close();
    }
}

app.get('/teste', async (req, res) => {
    run();
});

app.get('/usuario', async (req, res) => {
    const login = req.body;
    const resultado = await Usuario.find(login);
    console.log(resultado);
});

app.get('/posts', jwt_middleware({
    secret: jwtKey,
    algorithms: ['HS256']
}), (req, res) => {
    res.render('../view/posts');
});

app.post('/login', async (req, res) => {
    const { login, password } = req.body;
    const resultado = await Usuario.findAll(login, password);
    console.log("resultado => ", resultado);
    if (resultado.length === 1) {
        const token = jwt.sign({
            section: resultado
        }, jwtKey);
        console.log("Acessou!!!!!!!!")
        res.json({ token: token });
    } else {
        res.status(403).json({ message: "Acesso bloqueado!" })
    }
});

app.post('/usuario', async (req, res) => {
    const { login, password } = req.body;
    Usuario.insert(login, password);
});

app.listen(3000);
