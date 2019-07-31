const db = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'devshop'
    }
    
})
db.on('query', query => console.log('SQL:', query.sql))

const userModel = require('./models/user')
userModel.initialUser(db)()

const app = require('./app')(db)

const port = process.env.port || 3000
app.listen(port, () => console.log('DevShop is CONNECTED'))