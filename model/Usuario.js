const { MongoClient } = require("mongodb");

module.exports = class Usuario {
    static async insert(login, password) {

        const uri =
            "mongodb+srv://user:4ghMVoB0oZnHbJ5X@projeto-web.66aaexz.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        const database = client.db('VanGogh');
        const usuarios = database.collection('Usuarios');

        const insertResult = await usuarios.insertOne({
            login: login,
            password: password
        });
        console.log('Inserted documents =>', insertResult);
        await client.close();
    }

    static async find(login) {

        const uri =
            "mongodb+srv://user:4ghMVoB0oZnHbJ5X@projeto-web.66aaexz.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        const database = client.db('VanGogh');
        const usuarios = database.collection('Usuarios');

        console.log("O servidor conectou!")
        console.log("Valor do login: ", login);

        var query = new RegExp('^'+ login);

        const filteredDocs = await usuarios
            .find(login)
            .toArray();
        console.log('Found documents =>', filteredDocs);
        await client.close();
        return filteredDocs;
    }

    static async findAll(login, password) {

        const uri =
            "mongodb+srv://user:4ghMVoB0oZnHbJ5X@projeto-web.66aaexz.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        const database = client.db('VanGogh');
        const usuarios = database.collection('Usuarios');

        console.log("O servidor conectou!")
        console.log("Valor do login e password: ", login, password);

        const filteredDocs = await usuarios
            .find({login: login, password: password})
            .toArray();
        console.log('Found documents =>', filteredDocs);
        await client.close();
        return filteredDocs;
    }
}

