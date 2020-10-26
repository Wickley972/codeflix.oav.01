const fs = require('fs')

function convertToJSON(filename) {
    let myString = fs.readFileSync(filename)
    let regex = /(?<name>^[a-zA-Z].*)\s*=\s+(?<value>(".*)|(\w*))/gm
    let match = regex.exec(myString)
    let str = ""
    while (match != null) {
        if (match[2].startsWith("\"")) {
            match[2] = match[2].replace(/^"/, "")
            match[2] = match[2].replace(/"$/, "")
        }
        str += "\"" + match[1] + "\"" + ' : ' + "\"" + match[2] + "\"" + ','
        match = regex.exec(myString);
    }
    str = "\{" + str.replace(/,\s*$/gm, "") + "\}"

    fs.open('php.json', 'w+', function (err, f) {
        if (err) {
            return console.error(err);
        }
    })

    fs.writeFile('php.json', JSON.stringify(JSON.parse(str), null, '\t'), (err) => {
        if (err) throw err;
    })
}
convertToJSON(process.argv[2])