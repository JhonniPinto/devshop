const init = db => {
    const prodModels = require('../models/product')(db)
    
    const getProduct = async(req, res) => {
        const prodById = await prodModels.getProductById(req.params.id)
        res.render('product-detail', {
            product: prodById
        })
    }
    
    return {
        getProduct
    }
}
module.exports = init