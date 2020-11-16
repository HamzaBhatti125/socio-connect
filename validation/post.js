const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data){

    let errors = {};

    // check data.name is empty or not if empty then assign that empty string
    data.text = !isEmpty(data.text) ? data.text : "";
   
    if(!validator.isLength(data.text, {min: 4, max: 300})){
        errors.text = "post must be b/w 10 & 30 chars."
    }

    if(validator.isEmpty(data.text)){
        errors.text = "text field is required";
    }


    return{
        errors,
        isValid: isEmpty(errors)
    };
};