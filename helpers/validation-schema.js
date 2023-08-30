const joi=require('@hapi/joi')

const authschema = joi.object({
    username:joi.string().email().required().lowercase(),
    Password:joi.string().min(8).required()
})

module.exports={
    authschema
}