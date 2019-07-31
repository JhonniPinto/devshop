const init = db => {
    const express    = require('express')
    const app        = express()
    const path       = require('path')
    const bodyParser = require('body-parser')
    const session    = require('express-session')
    
    const catModels = require('./models/category')(db)
    const routes    = require('./routes')
    
    app.use(express.static(path.join(__dirname, 'public')))
    app.use(bodyParser.json({ extended: true }))
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: 'DevShopRulez!',
        name: 'sessionId'
    }))
    
    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'ejs')
    
    app.use(async(req, res, next) => {
        const categories = await catModels.getCategories()
        const user = req.session.user ? req.session.user : false
        res.locals = { categories, user }
        next()
    })
    
    app.use(routes(db))

    return app
}

module.exports = init