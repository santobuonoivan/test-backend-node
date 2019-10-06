/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users', {
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		user: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		password: {
			type: DataTypes.STRING(250),
			allowNull: false
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: false
		}
	}, {
		tableName: 'users',
		timestamps: false,
		underscored: true,
	});
};
