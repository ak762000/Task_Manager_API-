const Joi = require('@hapi/joi')

const userSchema = Joi.object({
    name : Joi.string().required(),
    email : Joi.string().email().lowercase().required(),
    password : Joi.string().min(8).required()
})

const loginSchema = Joi.object({
    email : Joi.string().email().lowercase().required(),
    password : Joi.string().min(8).required()
})

const taskSchema = Joi.object({
    title : Joi.string().required(),
    description : Joi.string().required(),
    dueDate : Joi.date().required()
 })

module.exports = {userSchema,loginSchema, taskSchema}