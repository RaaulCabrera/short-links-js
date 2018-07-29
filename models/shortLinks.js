module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ShortLinks', { 
        original: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        shortKey: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });
};