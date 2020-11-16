const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data){

    let errors = {};

    // check data.name is empty or not if empty then assign that empty string
    data.school = !isEmpty(data.school) ? data.school : "";
    data.degree = !isEmpty(data.degree) ? data.degree : "";
    data.field_of_study = !isEmpty(data.field_of_study) ? data.field_of_study : "";
    data.from = !isEmpty(data.from) ? data.from : "";
  

    if(validator.isEmpty(data.school)){
        errors.school = "school field is required";
    }

    if(validator.isEmpty(data.degree)){
        errors.degree = "degree field is required";
    }

    if(validator.isEmpty(data.from)){
        errors.from = "from date field is required";
    }

    if(validator.isEmpty(data.field_of_study)){
        errors.field_of_study = "field of study field is required";
    }

    return{
        errors,
        isValid: isEmpty(errors)
    };
};