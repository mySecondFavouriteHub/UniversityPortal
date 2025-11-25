const mysql = require('mysql');
const utils = require('./utils.js');
module.exports = class {
    #connection;
    #query;
    constructor(credentials) {
        this.#connection = mysql.createConnection(credentials);
        this.#getConnection().connect();
        this.#query = utils.promisify(this.#connection.query.bind(this.#connection))
    }
    /*
    Modularized connection object to enable connection pooling later.
     */
    #getConnection() {
        return this.#connection;
    }
    /*
    Insert to database
     */
    put(params) {
        const columns = params.columns;
        const table = params.table;
        const keys = Object.keys(columns);
        const statement = `INSERT INTO ${table} (${keys.join(',')}) VALUES (${keys.map(()=>'?').join(',')})`
        const values = keys.map(key=>params.values[key]);
        return this.#query(statement,values);
    }
    /*
    Retrieve from database
     */
    fetch(params) {
        const statement = `SELECT * FROM ${params.table}`
        if (!params.filters) return this.#query(statement+';');
        const filters = utils.joinObject(params.filters,' = ',' AND ');
        return this.#query(`${statement} WHERE ${filters};`);
    }
    /*
    Delete from database (filters REQUIRED)
     */
    delete(params) {
        //Construct the WHERE clause
        const filters = utils.joinObject(params.filters,' = ',' AND ');
        return this.#query(`DELETE FROM ${params.table} WHERE ${filters};`);
    }
}