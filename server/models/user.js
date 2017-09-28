module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            notEmpty: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            notEmpty: true,
        },
        firstName: { type: DataTypes.STRING },
        lastName: { type: DataTypes.STRING },
        role: {
            type: DataTypes.ENUM('Member', 'Client', 'Owner', 'Admin'),
            defaultValue: 'Member'
        },
        resetPasswordToken: { type: DataTypes.STRING },
        resetPasswordExpires: { type: DataTypes.DATE }
    }, {
        timestamps: true,
    });

    return User;
};