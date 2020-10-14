const connection = require('./index.js').connection;
const bcrypt = require('bcrypt');

const signup = async ({ name, email, password }) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 8, (err, hashedPass) => {
            if (err) {
                reject(err);
            } else {
                connection.query(`INSERT INTO users (name, email, password) VALUES ("${name}", "${email}", "${hashedPass}");`,
                    (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(result);
                        }
                    })
            }
        })
    })
}

module.exports = {
    signup
}