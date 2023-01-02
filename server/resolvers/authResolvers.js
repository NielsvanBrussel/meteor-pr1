const User = require('../models/User');
const bcrypt = require('bcryptjs'); 
const { GraphQLError } = require('graphql');

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

async function register(_, { registerInput }, { res }) {
    console.log('register called')

    // check if email isnt already in use
    const userExists = await User.find({ email: registerInput.email})
    if (userExists.length !== 0) {
        throw new GraphQLError('EMAIL ALREADY IN USE', {
            extensions: {
                code: 'EMAIL ALREADY IN USE'
            }
        })
    } else { 

        // encrypt the password
        const encryptedPassword = await bcrypt.hash(registerInput.password, 12)

        // create the new user
        const user = new User({
            first_name: registerInput.first_name,
            last_name: registerInput.last_name,
            email: registerInput.email,
            password: encryptedPassword,
        });
        user.save()

        // cookie test
        res.cookie("test", "500", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000*60*60*24*7 // 7days
        })

        return { message: 'account created', success: true }            
    }
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

async function login(parent, { loginInput }, { req }) {
    console.log('called login')
  
    // check if email is registered
    const userExists = await User.find({ email: loginInput.email})
    if (userExists.length === 0) {
        throw new GraphQLError('INVALID EMAIL OR PASSWORD', {
            extensions: {
                code: 'INVALID EMAIL OR PASSWORD'
            }
        })
    } else { 

        // compare input password to stored password
        const validPassword = bcrypt.compareSync(loginInput.password, userExists[0].password)

        if (!validPassword) { 
            throw new GraphQLError('INVALID EMAIL OR PASSWORD', {
                extensions: {
                    code: 'INVALID EMAIL OR PASSWORD'
                }
            })
        } else {
            // set session
            req.session.authenticated = true
            req.session.user_id = userExists[0]._id

            // return data
            return { message: 'logged in', success: true }
        }       
    }
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

async function logout(parent, args, { req }) {
    console.log('called logout')
        
    // clear session
    req.session.authenticated = false
    delete req.session.user_id
    
    return { message: 'logged out', success: true }
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

async function checkAuth(parent, args, { req }) {
    console.log('checkauth called')    
    if (req?.session?.authenticated) {
        return true
    } else {
        return false
    }
}

module.exports = {
    register,
    login,
    logout,
    checkAuth,
}