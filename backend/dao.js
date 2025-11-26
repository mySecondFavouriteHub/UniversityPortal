const mysql = require('mysql2');
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
    /*
    Update an entry in database
     */
    update(params) {
        const {table,columns,filters} = params;

        const setKeys = Object.keys(columns);
        const setClause = setKeys.map(key => `${key} = ?`).join(', ');
        const setValues = setKeys.map(key => columns[key]);

        const filterKeys = Object.keys(filters);
        const whereClause = filterKeys.map(key => `${key} = ?`).join(' AND ');
        const whereValues = filterKeys.map(key => filters[key]);

        const statement = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;

        return this.#query(statement, [...setValues, ...whereValues]);
    }
}