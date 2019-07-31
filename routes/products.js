const init = db => {
    const router = require('express').Router()
    const prodControl = require('../controllers/products')(db)

    router.get('/:id/:slug', prodControl.getProduct)

    return router
}

module.exports = init