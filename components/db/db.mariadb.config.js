const {username,password,database,host,port,dialect, pool} = require('./mariadb.config')[process.env.NODE_ENV];
const Sequelize = require('sequelize');
const sequelize = new Sequelize(database,username,password, {
    host: host,
    dialect: dialect,
    port: port
});

const db ={};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.users = require('../../users/models/users')(sequelize,Sequelize);
/*
db.roles = require('../../users/models/roles')(sequelize,Sequelize);
db.user_roles = require('../../users/models/user_roles')(sequelize,Sequelize);
db.permissions = require('../../users/models/permissions')(sequelize,Sequelize);
db.permission_user = require('../../users/models/permission_user')(sequelize,Sequelize);
db.permission_role = require('../../users/models/permission_role')(sequelize, Sequelize);


db.alumno = require('../alumno/model/alumno')(sequelize,Sequelize);
db.cuota = require('../cuotas/model/cuotas')(sequelize,Sequelize);
db.documentacion = require('../documentacion/model/documentacion')(sequelize,Sequelize);
db.pagos = require('../pagos/model/pagos')(sequelize,Sequelize);
*/
/* TODO falta hacer la coneccion de carreras materias alumno*/
/*
db.carrera = require('../carreras/model/carreras')(sequelize,Sequelize);


db.data = require('../data/model/data')(sequelize,Sequelize);
db.movimientos = require('../data/model/movimientos')(sequelize,Sequelize);
db.movimientos_types = require('../data/model/movimientos_types')(sequelize,Sequelize);

/*
db.materia = require('../materias/model/materias')(sequelize,Sequelize);
db.modalidades = require('../modalidades/model/modalidades')(sequelize,Sequelize);
db.turnos = require('../turnos/model/turnos')(sequelize,Sequelize);*/

/* es necesario desde el mas particular al general entonces se necesita hacer belongsto antes de un hasmany */
// Caja

//db.movimientos_types.belongsTo(db.movimientos, {as: 'data', foreignKey:'movimiento_type_id', targetKey:'movimiento_type_id', sourceKey:'movimiento_type_id'});
/*

db.movimientos.belongsTo(db.movimientos_types, {as: 'movimientos_types', foreignKey:'movimiento_type_id', targetKey:'movimiento_type_id', sourceKey:'movimiento_type_id'});
db.movimientos_types.hasMany(db.movimientos, {as: 'movimientos', foreignKey:'movimiento_type_id', targetKey:'movimiento_type_id', sourceKey:'movimiento_type_id'});


db.movimientos.belongsTo(db.data, {as: 'data', foreignKey:'id_caja', targetKey:'id_caja', sourceKey:'id_caja'});
db.data.hasMany(db.movimientos, {as: 'movimientos', foreignKey:'id_caja', targetKey:'id_caja', sourceKey:'id_caja'});



// Alumno
db.cuota.belongsTo(db.alumno, {as: 'alumno', foreignKey:'alumno_id', targetKey:'alumno_id', sourceKey:'alumno_id'});
db.alumno.hasMany(db.cuota, {as: 'cuotas', foreignKey:'alumno_id', targetKey:'alumno_id', sourceKey:'alumno_id'});
db.pagos.belongsTo(db.alumno, {as: 'alumno', foreignKey:'alumno_id', targetKey:'alumno_id', sourceKey:'alumno_id'});
db.alumno.hasMany(db.pagos, {as: 'pagos', foreignKey:'alumno_id', targetKey:'alumno_id', sourceKey:'alumno_id'});
db.documentacion.belongsTo(db.alumno, {as: 'alumno', foreignKey:'alumno_id', targetKey:'alumno_id', sourceKey:'alumno_id'});
db.alumno.hasMany(db.documentacion, {as: 'documentacion', foreignKey:'alumno_id', targetKey:'alumno_id', sourceKey:'alumno_id'});

// Permissions Roles
db.users.belongsToMany(db.roles, {through:'user_roles', foreignKey:'usuario_id',otherKey:'role_id'});
db.roles.belongsToMany(db.users, {through: 'user_roles', foreignKey: 'role_id'});
db.users.belongsToMany(db.permissions, {through: 'permission_user', foreignKey:'usuario_id', otherKey: 'permission_id'});
db.permissions.belongsToMany(db.users, {through:'permission_user', foreignKey:'permission_id'});
db.roles.belongsTo(db.roles, {foreignKey:'parent'});
db.permissions.belongsToMany(db.roles, {through: 'permission_role', foreignKey:'permission_id', otherKey:'role_id'});
*/
db.sequelize.sync({force:false}).then(() =>  {});

module.exports =  db;

