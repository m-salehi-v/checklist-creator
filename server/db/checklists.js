const connection = require('./index.js').connection;

const getChecklistsByUserId = async (userId) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM checklists WHERE user_id = ${userId}`, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    })
}

module.exports = {
    getChecklistsByUserId
}