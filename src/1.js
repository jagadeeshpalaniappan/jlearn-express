const express = require('express');
const bodyParser = require('body-parser');
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('./db');

/**
 Express: basics
*/
// ########################## Express Config ##########################
const app = express();

// parse body params and attach them to req.body (without these req.body wont be available)
app.use(bodyParser.json()); // to parse JSON request body
app.use(bodyParser.urlencoded({ extended: true })); // to parse JSON request body


// ##########################  User Ctrl ##########################
const userCtrl = {};

userCtrl.getUsers = async (req, res) => {
    try {
        // console.log(req.query.myFilter);
        const users = await getUsers();
        res.status(200)
            .set('headerkey1', 'headerVal1')
            .json(users);
    } catch (e) {
        res.status(500)
            .set('headerkey1', 'headerVal1')
            .json(e);
    }
};

userCtrl.getUser = async (req, res) => {
    try {
        const user = await getUser(parseInt(req.params.id));
        res.json(user);
    } catch (e) {
        res.status(500)
            .json(e);
    }
};
userCtrl.createUser = async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.json(user);
    } catch (e) {
        res.status(500)
            .json(e);
    }
};
userCtrl.updateUser = async (req, res) => {
    try {
        const user = await updateUser(parseInt(req.params.id), req.body);
        res.json(user);
    } catch (e) {
        res.status(500)
            .json(e);
    }
};
userCtrl.deleteUser = async (req, res) => {
    try {
        const user = await deleteUser(parseInt(req.params.id));
        res.json(user);
    } catch (e) {
        res.status(500)
            .json(e);
    }
};

// ##########################  Routes ##########################

app.get('/api/users', userCtrl.getUsers);
app.post('/api/users/', userCtrl.createUser);
app.get('/api/users/:id', userCtrl.getUser);
app.put('/api/users/:id', userCtrl.updateUser);
app.delete('/api/users/:id', userCtrl.deleteUser);


// ################## Express: Start Server ########################

app.listen(2020, () => {
    console.log('Express server is started, running at http://localhost:2020');
});

