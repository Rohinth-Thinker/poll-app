
function validateInputs(inputs) {
    for(const key in inputs) {
        if(!inputs[key] || !(inputs[key].replace(' ', ''))) {
            return {status: false, error: {occuredAt: key, msg: 'Please fill in this field!'}};
        }
    }

    if(inputs.password.length < 8) {
        return {status: false, error: {occuredAt: 'password', msg: 'At least 8 characters'}};
    }

    return {status: true};
}

module.exports = validateInputs;