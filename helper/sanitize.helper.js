const Sanitize = function(){}

Sanitize.isInteger = (val) => {
    return (/^\d+$/.test(val))
}

Sanitize.betweenLimits = (val, min, max) => {
    return (val >= min && val <= max)
}

Sanitize.minimum = (val, min) => {
    return (val >= min)
}

Sanitize.stringLength = (val, min, max) => {
    return (val.length >= min && val.length <= max)
}

Sanitize.hasNoScript = (val) => {
    return (val.includes("<") || val.includes(">"))
}

module.exports = Sanitize