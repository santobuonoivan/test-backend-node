const _ = require('lodash');
const bcrypt = require('bcryptjs');
const Joi = require('@hapi/joi');
//const {users, roles, permissions, permission_role, permission_user, user_roles } = require('../database/db.config');
const { users } = require('../components/db/db.mariadb.config');
const userService = require('../users/services/UserService');



exports.authenticate = async function (req, res, next) {
    const { error }= validate(req.body);
    if(error) return res.status(400).json({'error':error.details[0].message});
    let user = await users.findOne({where:{user:req.body.user}});
    if(!user) return res.status(400).json({'error':'Invalid email or password'});
    const validPassword = await bcrypt.compare(req.body.password , user.password);
    if(!validPassword) return res.status(400).json({'error':'Invalid email or password'});
    const response = userService.generateAuthToken(user);
    res.json(response);
};


function validate(req) {
    const schema = {
        user: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
}