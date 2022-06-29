
const validateInput = (state) => {
    let errors = []
    if (state.email === ''){
        errors.push('Email is required')
    }
    if (state.password === ''){
        errors.push('Password is required');
    }

    if (errors.length > 0){
        return errors;
    }else {
        return true;
    }
}

const utils = {validateInput}

export default utils;