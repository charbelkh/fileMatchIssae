const regexConfig = require('./fileHandling.regexConfig')
const fs = require('fs')

class Service {
    constructor() {}

    async getOptions() {
        let options = Object.keys(regexConfig)
        return options
    }

    async matchInFile(type, filePath, pattern) {
        let regex = ""
        if (type in Object.keys(regexConfig)) {
            regex = new RegExp(regexConfig[type], 'gim')
        } else {
            regex = new RegExp(pattern ,'gim')
        }
        if (fs.existsSync(filePath)) {
            let fileContent = fs.readFileSync(filePath, "utf8");
            let allStrings = [...fileContent.matchAll(regexp)];
            let allIndexes = []
            for (let i = 0; i < allStrings.length; i++) {
                allIndexes.push({
                    stringValue: allStrings[i],
                    stringIndexes: [...fileContent.matchAll(new RegExp(allStrings[i], 'gi'))].map(a => a.index)
                })
            }
            return allIndexes
        } else {
            throw new Error('fileNotFound');
        }
    }

}

module.exports = Service;