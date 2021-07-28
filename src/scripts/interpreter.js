const fs = require("fs");

const interpreter = async (client, code) => {
    let funcs = fs.readdirSync("../funcs").filter(file => file.endsWith('.js'))
    for(const file of funcs) {
        const func = require(`../funcs/${file}`)
        
        
    }
}

//module.exports = interpreter