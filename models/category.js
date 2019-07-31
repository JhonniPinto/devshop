const init = db => {
    const slug = require('../utils/slug')
    const validation = require('../utils/valitation')
    
    const Joi  = require('@hapi/joi')
    
    
    const createSchema = Joi.object().keys({
        category: Joi.string().min(4).max(245).required(),
        description: Joi.string().min(5).required()
    })
    
    const getCategoryById = async(id) => {
        const category = await db('categories').select('*').where('id', id)
        return category
    }
    
    const getCategories = async() => {
        const categories = await db('categories').select('*')
        const categoriesWithSlug = categories.map( category => {
            const newCategory = {...category, slug: slug(category.category) }
            return newCategory
        })
        return categoriesWithSlug
    }
    
    const createCat = async(data) => {
        const value = validation.validate(data, createSchema)
        await db('categories').insert(value)
        return true
    }
    
    const removeCat = async(id) => {
        await db('categories').del().where({id: id})
    }
    
    const updateCat = async(data, id) => {
        const value = validation.validate(data, createSchema)
        await db('categories').update(value).where({id})
        return true
    }
    
    return {
        getCategoryById,
        getCategories,
        createCat,
        removeCat,
        updateCat
    }
}

module.exports = init