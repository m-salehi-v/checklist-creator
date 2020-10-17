const connection = require('./index.js').connection;

const fetchChecklists = async (userId, isUsedChecklist) => {
    return new Promise((resolve, reject) => {
        const tableName = isUsedChecklist ? "used_checklists" : "checklists";
        connection.query(`SELECT * FROM ${tableName} WHERE user_id = ${userId}`, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    })
}

const insert = async (data, isUsedChecklist) => {
    return new Promise((resolve, reject) => {
        let query = `INSERT INTO checklists (title, date, user_id) VALUES 
        ("${data.title}", "${data.date}", "${data.userId}")`;
        if(isUsedChecklist) {
            query = `INSERT INTO used_checklists (title, date, user_id, completed_tasks, tasks_number) VALUES 
            ("${data.title}", "${data.date}", "${data.user_id}", "${data.completedTasks}", "${data.tasksNum}")`;
        }
        connection.query(query, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                data.tasks.forEach((task, index) => {
                    let query = `INSERT INTO ${isUsedChecklist ? "used_checklists_tasks" : "tasks"} (title, body, checked, checklist_id) VALUES ("${task.title}", "${task.body}", "${task.checked ? 1 : 0}", "${result.insertId}");`; 
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

const getChecklistById = async (id, isUsedChecklist) => {
    return new Promise((resolve, reject) => {
        const tableName = isUsedChecklist ? "used_checklists" : "checklists";
        connection.query(`SELECT * FROM ${tableName} WHERE id = ${id}`, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                const tableNameTasks = isUsedChecklist ? "used_checklists_tasks" : "tasks";
                connection.query(`SELECT * FROM ${tableNameTasks} WHERE checklist_id = ${id}`, (err2, tasks) => {
                    if(err2) {
                        reject(err2);
                    } else {
                        const finalResult = result[0];
                        finalResult.tasks = tasks;
                        console.log(finalResult);
                        resolve(finalResult);
                    }
                })
            }
        })
    })
}


module.exports = {
    fetchChecklists,
    insert,
    getChecklistById
}