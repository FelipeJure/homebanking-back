const verify_string = (...values) => {
    return [...values].every(value => typeof value === 'string')
}

const verify_email = (email) => {
    const reg_exp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const is_email = email.match(reg_exp)
    return is_email !== null
}



module.exports = { verify_string, verify_email }