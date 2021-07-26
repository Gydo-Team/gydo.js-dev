const fs = require("fs");

const interpreter = async (client, va) => {
    let funcs = fs.readdirSync("../funcs").filter(file => file.endsWith('.js'))
    for(const file of funcs) {
        const func = require(`../funcs/${file}`)
        
        const cmd = client.commands.get(va.name)
        
        if(!cmd) return;
    }
}

//module.exports = interpreter