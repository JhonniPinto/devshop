const express  = require('express')
const path     = require('path')
const category = require('./models/category')
const product  = require('./models/product')
const port     = process.env.port || 3000
const app      = express()
const db       = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'devshop'
    }
    
})
db.on('query', query => {
    console.log('SQL:', query.sql)
})

app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', async(req, res) => {
    const categories = await category.getCategories(db)()
    res.render('home', {
        categories
    })
})
app.get('/categoria/:id/:slug', async(req, res) => {
    const { id }       = req.params
    const categoryById = await category.getCategoryById(db)(id)
    const categories   = await category.getCategories(db)()
    const products     = await product.getProductsByCategoryId(db)(id)
    res.render('category', {
        categories,
        category: categoryById,
        products
    })
})

app.listen(port, err => {
    if (err) {
        console.log('ERRO', err)
    } else {
        console.log('DevShop is CONNECTED')
    }
})