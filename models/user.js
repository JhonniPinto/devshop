const bcrypt = require('bcryptjs')

const genPassHash = passwd => {
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(passwd, salt)
    return hash
}

const initialUser = db => async() => {
    const count = await db('users').count('id as total')
    if ( count[0].total === 0 ) {
        const user = {
            name: 'Admin',
            email: 'admin@devshop.com.br',
            passwd: genPassHash('MinhaSenhaDificil!'),
            email_checked: true,
            created: new Date(),
            updated: new Date(),
            roles: 'admin, financial, customer'
        }
        await db('users').insert(user)
    }
}

const login = db => async(email, password) => {
    const user = await db('users').select('*').where('email', email)
    if (user.length === 0) {
        throw new Error('Invalid User')
    }
    if (!bcrypt.compareSync(password, user[0].passwd)) {
        throw new Error('Invalid Password')
    }

    return user[0]
}

module.exports = { 
    initialUser,
    login
}