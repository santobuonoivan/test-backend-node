const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const {users } = require('../../components/db/db.mariadb.config');
const {Sequelize} = require('sequelize');
const Op = Sequelize.Op;
const expiredToken = process.env.TOKEN_TIME_EXPIRED;
const moment = require('moment');


/* TODO hacer validate para update que no sean todos los campos requeridos */
function generateAuthToken(_user) {
    const { user_id, user } = _user;
    const token = jwt.sign({user_id:user_id, user:user}, config.get('jwtPrivateKey'),{expiresIn:expiredToken});
    const expire = moment().add(24,'hours').format('YYYY-MM-DDTHH:MM:SS')

    return {token,expire};
}


function validateUser(user) {
    const schema = {
        user: Joi.string().min(2).max(200).required(),
        name: Joi.string().min(2).max(200).required(),
        password: Joi.string().min(5).max(250).required()
    };

    return Joi.validate(user, schema);
}

exports.validateUserExist = async function (user) {
    try {
        const resultFind = await users.findOne({where: {user_id: user.user_id}});
        if(!resultFind) return false;
        return true;
    } catch (e) {
        return e;
    }
};
exports.generateAuthToken = generateAuthToken;
exports.validateUser = validateUser;
