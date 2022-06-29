

const validateInput = (state) => {
    const errors = [];
    console.log(state.email, state.confirmEmail, state.password, state.confirmPassword);
    if (state.email !== state.confirmEmail && state.email.length > 1 && state.confirmEmail.length > 1){
        errors.push('Emails do not match');
    }
    if (state.password !== state.confirmPassword && state.password.length > 0 && state.confirmPassword.length > 0){
        errors.push('Passwords do not match');
    }
    if(state.email !== state.confirmEmail){
        errors.push('Emails must match');
    }
    if (state.password !== state.confirmPassword){
        errors.push('Password must match');
    }
    if (state.email === ''){
        errors.push('Please enter your email');
    }
    if (state.password === ''){
        errors.push('Please enter a password');
    }
    if (errors.length > 0){
        return errors;
    }
    else{
        return true;
    }
}

const utils = {validateInput}

export default utils;