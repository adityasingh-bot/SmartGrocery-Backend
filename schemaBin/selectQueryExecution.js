const mysql = require("mysql");
const logger = require("log4js");
async function putQuery(query, connParam, queryParam){
   return new Promise((resolve,reject)=>{
        connParam.query(query,queryParam,(err,res) => {
            if (err) reject(err);
            else resolve(res);
        });
    });
} 

async function insertQuery(query, connParam, queryParam) {
    return new Promise((resolve, reject) => {
        connParam.query(query, queryParam, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res.affectedRows);
            }
        });
    });
}


module.exports={
    putQuery,
    insertQuery
}