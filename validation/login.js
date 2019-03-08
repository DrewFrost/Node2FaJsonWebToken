const Validator = require('validator');
const isEmpty = require('./isEmpty');

const validateLoginInput = data => {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email can't be blank";
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email doesn't look correct";
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password can't be blank";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
};
module.exports = validateLoginInput;