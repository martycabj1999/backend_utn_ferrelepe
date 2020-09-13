module.exports = (sequelize, type) => {

    const Career = sequelize.define('career', {
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

    return Career

}
