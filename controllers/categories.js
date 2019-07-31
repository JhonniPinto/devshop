const init = db => {
    const catModels  = require('../models/category')(db)
    const prodModels = require('../models/product')(db)
    
    const getCategoriesProd = async(req, res) => {
        const { id }       = req.params
        const categoryById = await catModels.getCategoryById(id)
        const products     = await prodModels.getProductsByCategoryId(id)
        res.render('category', {
            category: categoryById,
            products
        })
    }
    
    const adminGetCategories = async (req, res) => {
        const categories = await catModels.getCategories()
        res.render('admin/categories/index',{
            categories
        })
    }
    
    
    const adminCreateCategory = async(req, res) => {
        if (req.method === 'POST') {
            try{
                const data = req.body
                await catModels.createCat(data)
                res.redirect('/admin/categorias')
            } catch (err) {
                res.render('admin/categories/create', { errors: err.errors.fields, form: req.body })
            }
        } else {
            res.render('admin/categories/create', { errors: false , form: false })
        }
    }
    
    const adminRemoveCategory = async(req, res) => {
        const id = req.params.id
        await catModels.removeCat(id)
        res.redirect('/admin/categorias')
    }
    
    const adminUpdateCategory = async(req, res) => {
        if (req.method === 'POST') {
            try{
                const id = req.params.id
                const data = req.body
                await catModels.updateCat(data, id)
                res.redirect('/admin/categorias')
            } catch (err) {
                res.render('admin/categories/update', { errors: err.errors.fields, form: req.body })
            }
        } else {
            const id = req.params.id
            const category = await catModels.getCategoryById(id)
            res.render('admin/categories/update', {errors: false, form: category[0]})
        }
    }
    return {
        getCategoriesProd,
    
        adminGetCategories,
        adminCreateCategory,
        adminRemoveCategory,
        adminUpdateCategory
    }
}

module.exports = init