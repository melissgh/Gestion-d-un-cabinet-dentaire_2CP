const joi = require('joi');

const userValidation = (body) => {

    const userValidationSignUp = joi.object({
        firstName: joi.string().min(2).max(30).trim().required(),
        lastName: joi.string().min(2).max(30).trim().required(),
        email: joi.string().email().trim().required(),
        password: joi.string().min(8).max(100).required(),
        placeOfBirth: joi.string().trim().required(),
        dateOfBirth: joi.required(),
        gender: joi.string().required(),
        confirmPassword: joi.any().valid(joi.ref('password')),
        phone: joi.string().required()


    })

    const userValidationLogin = joi.object({
        email: joi.string().email().trim().required(),
        password: joi.string().min(8).max(100).required()
    })

    return {
        userValidationSignUp: userValidationSignUp.validate(body),
        userValidationLogin: userValidationLogin.validate(body)
    }
}
module.exports = userValidation;












