const connection = require('./index.js').connection;
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const config = require('../config');

const signup = async ({ name, email, password }) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 8, (err, hashedPass) => {
            if (err) {
                reject(err);
            } else {
                connection.query(`INSERT INTO users (name, email, password) VALUES ("${name}", "${email}", "${hashedPass}");`,
                    (err, result) => {
                        if (err) {
                            if(err.sqlMessage.startsWith('Duplicate entry')){
                                reject(new Error('email already exists!'))
                            }
                            else {
                                reject(err);
                            }
                        }
                        else {
                            resolve(result);
                        }
                    })
            }
        })
    })
}

const login = async ({ email, password }) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users WHERE email="${email}";`,
            (err, result) => {
                if (err) {
                    reject(err);
                }
                else if(result.length !== 0){
                    const hashedPass = result[0].password;
                    bcrypt.compare(password, hashedPass, (error, res) => {
                        if(error) {
                            reject(error);
                        }
                        else if(!res) {
                            reject(new Error("password and email does not match"));
                        } else {
                            const token = jwt.sign({id: result[0].id}, config.jwt_secret_key, {
                                expiresIn: config.jwt_expires_in
                            });
                            const data = {
                                token,
                                cookieOptions: {
                                    expires: new Date(
                                        new Date().getTime() + config.cookieExpires
                                    ),
                                    httpOnly: true
                                }
                            }
                            resolve(result[0]);
                        }
                    })
                } else {
                    reject(new Error('you should signup first'));
                }
            })
    })
}

module.exports = {
    signup,
    login
}