const fs = require('fs');

const getJsonFromObject = (file, path, data) => {

    let json = JSON.stringify(data);
    let fullPath = path + file;

    fs.writeFile(fullPath, json, (err) => {
        if (err) {
            console.log(err);
        }
        else {

            console.log(`Json file has been created in output folder`);
        }
    })
}

const getRequest = (resource, getData) => {

    return fetch(resource).then(response => response.json())
        .then(response => {
            getData(response)
        })
}

module.exports.getJsonFromObject = getJsonFromObject;
module.exports.getRequest = getRequest;