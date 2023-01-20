const verify_string = (...values) => {
    return [...values].every(value => typeof value === 'string')
}

const verify_email = (email) => {
    const reg_exp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const is_email = email.match(reg_exp)
    return is_email !== null
}

const verify_number = (...number) => {
    return [...number].every(value => typeof value === 'number')
}

const right_number = (number) => {
    const bigNumber = Number((Math.abs(number) * 100).toPrecision(15));
    return Math.round(bigNumber) / 100 * Math.sign(number);
}

const verify_integer = (number) => {
    const array = `${number}`.split('.')
    return array.length === 1
}

module.exports = { verify_string, verify_email, verify_number, right_number, verify_integer }