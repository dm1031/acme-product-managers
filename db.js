const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL)

const User = conn.define('users', {
    name: Sequelize.STRING
})

const Product = conn.define('products', {
    name: Sequelize.STRING,
    managerId: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
})

Product.belongsTo(User, { as: 'manager' })

const syncAndSeed = () => {
    return conn.sync({force: true})
        .then( () => {
            return Promise.all([
                User.create({ name: 'moe' }),
                User.create({ name: 'larry' }),
                User.create({ name: 'curly' }),
                Product.create({ name: 'foo' }),
                Product.create({ name: 'bar' }),
                Product.create({ managerId: 2, name: 'bazz' })
        ])
    })
}

module.exports = {
    User,
    Product,
    syncAndSeed
}

