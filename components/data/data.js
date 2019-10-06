/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('data', {
		name: {
			type: DataTypes.STRING(150),
			allowNull: false
		},
		segment1: {
			type: DataTypes.INTEGER(4),
			allowNull: false
		},
		segment2: {
			type: DataTypes.INTEGER(4),
			allowNull: false
		},
		segment3: {
			type: DataTypes.INTEGER(4),
			allowNull: false
		},
		segment4: {
			type: DataTypes.INTEGER(4),
			allowNull: false
		},
		platformId: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		clientId: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		}
	}, {
		tableName: 'data'
	});
};
