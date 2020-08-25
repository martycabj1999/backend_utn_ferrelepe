module.exports = (sequelize, type) => {

    const Role = sequelize.define('role', {
        name: {
            type: type.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "name es requerido"
                },
            },
        }
    }, {
        paranoid: true,
        timestamps: true
    })

    return Role

}
