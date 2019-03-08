const Validator = require('validator');
const isEmpty = require('./isEmpty');


const validateRegisterInput = data => {
    let errors = {};
    data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
    data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    if (!Validator.isLength(data.firstname, {min: 2, max:undefined})) {
        errors.firstname = "Name must be at least 2 characters";
    }
    if (!Validator.isLength(data.lastname, {min: 2})) {
        errors.lastname = "Last name must be at least 2 characters";
    }
    if (!Validator.isLength(data.firstname, {min:undefined,max: 30})) {
        errors.firstname = "Name must less than 30 characters";
    }
    if (!Validator.isLength(data.lastname, {min:undefined, max: 30})) {
        errors.lastname = "Last name must less than 30 characters";
    }
    if (Validator.isEmpty(data.firstname)) {
        errors.firstname = "Please enter your first name";
    }
    if (Validator.isEmpty(data.lastname)) {
        errors.lastname = "Please enter your last name";
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email doesn't look correct";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email can't be blank";
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password can't be blank";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Please confirm your password";
    }
    if (!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = "Password must be at least 6 characters";
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password = "Passwords must match";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
};
module.exports = validateRegisterInput;