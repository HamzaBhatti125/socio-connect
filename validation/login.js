const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data){

    let errors = {};

    // check data.name is empty or not if empty then assign that empty string
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
   
    if(!validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }

    if(validator.isEmpty(data.email)){
        errors.email = "Email field is required";
    }


    if(validator.isEmpty(data.password)){
        errors.password = "Password field is required";
    }

    return{
        errors,
        isValid: isEmpty(errors)
    };
};