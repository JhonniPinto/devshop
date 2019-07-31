const init = db => {
    const router = require('express').Router()
    const categories = require('./categories')

    // autorização
    /*router.use((req, res, next) => {
        if ('user' in req.session) {
            if(req.session.user.roles.indexOf('admin') >= 0){
                next()
            } else {
                res.redirect('/')
            }
        } else {
            res.redirect('/')
        }
    })*/

    router.get('/', (req, res) => res.render('admin/index'))

    router.use('/categorias', categories(db))

    return router
}

module.exports = init