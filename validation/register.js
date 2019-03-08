const Validator = require('validator');
const isEmpty = require('./isEmpty');


const validateRegisterInput = data => {
    let errors = {};
    data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
    data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    if (!Validator.isLength(data.firstname, {min: 2, max: 30})) {
        errors.firstname = 'Name must be between 2 and 30 characters';
    }
    if (!Validator.isLength(data.lastname, {min: 2, max: 30})) {
        errors.lastname = 'Last Name must be between 2 and 30 characters';
    }
    if (Validator.isEmpty(data.firstname)) {
        errors.firstname = 'Name is required';
    }
    if (Validator.isEmpty(data.lastname)) {
        errors.lastname = 'Last Name is required';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password field is required';
    }
    if (!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must be at least 6 characters';
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password = 'Passwords must match';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
};
module.exports = validateRegisterInput;