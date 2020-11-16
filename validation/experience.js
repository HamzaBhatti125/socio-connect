const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data){

    let errors = {};

    // check data.name is empty or not if empty then assign that empty string
    data.title = !isEmpty(data.title) ? data.title : "";
    data.company = !isEmpty(data.company) ? data.company : "";
    data.from = !isEmpty(data.from) ? data.from : "";
  

    if(validator.isEmpty(data.title)){
        errors.title = "job title field is required";
    }

    if(validator.isEmpty(data.company)){
        errors.company = "company field is required";
    }

    if(validator.isEmpty(data.from)){
        errors.from = "from date field is required";
    }

    return{
        errors,
        isValid: isEmpty(errors)
    };
};