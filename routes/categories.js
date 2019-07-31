const init = db => {
    const router = require('express').Router()
    const catControl = require('../controllers/categories')(db)
    
    router.get('/:id/:slug', catControl.getCategoriesProd)
    
    return router
}


module.exports = init