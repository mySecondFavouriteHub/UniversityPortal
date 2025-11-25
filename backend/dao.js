const mysql = require('mysql');
const utils = require('./utils.js');
const schemaMap = require('./schemabuilder').schemaMap;
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
        const {table,columns} = schemaMap[params.table];
        const {values} = params;
        if (!table) throw new Error(`Invalid category provided: ${params.table}`);
        if (!columns || Object.keys(values).length !== Object.keys(columns).length) throw new Error('Column mismatch');

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