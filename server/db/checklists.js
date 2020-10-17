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

const insert = async (checklist) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO checklists (title, date, user_id) VALUES 
        ("${checklist.title}", "${new Date()}", "${checklist.userId}")`, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                checklist.tasks.forEach((task, index) => {
                    let query = `INSERT INTO tasks (title, body, checked, checklist_id) VALUES ("${task.title}", "${task.body}", "${task.checked ? 1 : 0}", "${result.insertId}");`; 
                    connection.query(query, (insertTaskErr, insertTaskResult) => {
                        if(insertTaskErr) {
                            reject(insertTaskErr);
                        }
                    })
                })
                resolve(result);   
            }
        })
    })
}

module.exports = {
    getChecklistsByUserId,
    insert
}