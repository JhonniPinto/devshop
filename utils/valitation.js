const Joi = require('@hapi/joi')

const extractErrors = error => {
    const errors = error.details.reduce((prev, curr) => {
        if (prev[curr.path[0]]) {
            prev[curr.path[0]].push(curr.type)
        } else {
            prev[curr.path[0]] = [curr.type]
        }
        return prev
    }, {})
    return {
        errors,
        fields: Object.keys(errors)
    }
}

 const validationError = (message, errors) => ({
    message,
    errors
 })

const validate = (obj, schema) => {
    const { error, value } = Joi.validate(obj, schema, { abortEarly: false, stripUnknown: true })
    if (error) {
        throw validationError('validation', extractErrors(error))
    } else {
        return value
    }
}

module.exports = {
    validate
}