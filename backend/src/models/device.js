module.exports = (sequelize, DataTypes) => {
    const Device = sequelize.define('Device', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdBy: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,
        },
        updatedBy: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,
        },
        deletedBy: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,
        },
    },
    {
        tableName: 'devices',
    });
    Device.associate = function (models) {
        Device.belongsTo(models.Room, { as: 'room', foreignKey: 'roomId' });
    };
    return Device;
};
