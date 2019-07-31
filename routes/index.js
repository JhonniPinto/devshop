const init = db => {
    const router      = require('express').Router()
    const getHome     = require('../controllers/home')
    const catRouter   = require('./categories')
    const prodRouter  = require('./products')
    const getAuth     = require('../controllers/auth')
    const adminRouter = require('./admin/index')

    // auth
    router.get('/', getHome)
    router.post('/login', getAuth.login(db))
    router.get('/logout', getAuth.logout)

    // routes
    router.use('/admin', adminRouter(db))
    router.use('/categoria', catRouter(db))
    router.use('/produto', prodRouter(db))

    return router
}

module.exports = init