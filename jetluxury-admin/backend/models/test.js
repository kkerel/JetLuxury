module.exports = function(sequelize, DataTypes) {

    var Test = sequelize.define('Test', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: DataTypes.STRING(45),
    },
        {
            freezeTableName: true,
            tableName: 'test'
    });

    return Test;
};