const init = db => {
    const router     = require('express').Router()
    const catControl = require('../../controllers/categories')(db)

    router.get('/', catControl.adminGetCategories)

    router.get('/nova', catControl.adminCreateCategory)
    router.post('/nova', catControl.adminCreateCategory)
    
    router.get('/excluir/:id', catControl.adminRemoveCategory)

    router.get('/editar/:id', catControl.adminUpdateCategory)
    router.post('/editar/:id', catControl.adminUpdateCategory)

    return router
}

module.exports = init