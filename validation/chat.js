const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateChatInput(data){

    let errors = {};

    // check data.name is empty or not if empty then assign that empty string
    data.text = !isEmpty(data.text) ? data.text : "";
    data.receiver_id = !isEmpty(data.receiver_id) ? data.receiver_id : "";
    data.receiver_name = !isEmpty(data.receiver_name) ? data.receiver_name : "";

    if(validator.isEmpty(data.text)){
        errors.text = "text field is required";
    }
    
    if(validator.isEmpty(data.receiver_name)){
        errors.text = "Receiver must require";
    }
    
    if(validator.isEmpty(data.receiver_id)){
        errors.text = "receiver id must be require";
    }
    
    return{
        errors,
        isValid: isEmpty(errors)
    };
};