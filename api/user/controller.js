const Qs = require('qs');
const utils = require('./utils');

const model = require('./model')


const createUser = async (req, res) => {
    try {
        const user = await model.findOne({ email: req.body.email});
        if (user) {
            return res.status(400).send('Email already exists');
        }
        // Creates new video, timesViewed is always 0 and all field not in the schema will be ignored
        const newUser = new model({
            ...req.body,
            password: utils.hashIt(req.body.password),
            expire: null,
        });

        const result = await newUser.save();

        // removing password before sending the data
        delete result.password;

        return res.send(result);
    } catch (err) {
        if (err) {
            console.error('Error creating user', err);
            throw new Error(err);
        }
    }
};

const updateUser = async (req, res) => {
    try {

        if (req.body.password) {
            req.body.password = utils.hashIt(req.body.password)
        };

        const result = await model.findByIdAndUpdate(req.params.id, {
            ...req.body,
        },{new: true})

        // removing password before sending the data
        delete result.password;

        return res.send(result);
    } catch (err) {
        if (err) {
            console.error('Error updating user', err);
            throw new Error(err);        
        }
    }
};

const getUser = async (req, res) => {
    try {
        const result = await model.findById(req.params.id)

        // removing password before sending the data
        delete result.password;

        return res.send(result);
    } catch (err) {
        if (err) {
            console.error('Error getting user', err);
            throw new Error(err);        
        }
    }
};

/**
 * Not exported, getting a list of all users it's not a valid API
 **/

const getUsers = async (req, res) => {
    // removes offset and limit form query string to not conflict with the where statement below
    req.limit = req.query.limit;
    delete req.query.limit
    req.offset = req.query.offset;
    delete req.query.offset

    // parses query string to a valid mongoose where statement
    const q = (req.query) ? Qs.parse(req.query) : {};

    req.where = q || {};

    try {
        const result = await model
            .where(req.where)
            .limit(parseInt(req.limit || '10', 10))
            .skip(parseInt(req.offset || '0', 10))
            .sort()
            .find()
            .exec()

        return res.send(result);
    } catch (err) {
        if (err) {
            console.error('Error getting users', err);
            throw new Error(err);        
        }
    }
};

const deleteUser = async (req, res) => {
    try {
        const result = await model.findByIdAndDelete(req.params.id)

        return res.send({});
    } catch (err) {
        if (err) {
            console.error('Error deleting user', err);
            throw new Error(err);        
        }
    }
};

const login = async (req, res) => {
    const user = await model.findOne({ email: req.body.email });

    if (!user) {
        return res.status(404).send('User not found');
    };

    const hashedPassword = utils.hashIt(req.body.password);

    if (hashedPassword !== user.password) {
        return res.status(400).send('wrong user or password');
    }

    const token = utils.sign(user._id.toString());
    user.token = utils.hashIt(token);
    user.tokenExpire = Date.now() + 1000 * 60 * 60 * 24, //1 day

    await model.findByIdAndUpdate(user._id, user);

    return res.status(200).send({
        token,
        email: user.email
    });
};

const validateToken = async (req, res) => {

}

module.exports = {
    getUser,
    deleteUser,
    createUser,
    updateUser,
    login,
}