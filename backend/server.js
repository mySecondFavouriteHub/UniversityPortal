const express = require('express');
const dao = require('./dao.js');
const utils = require('./utils.js');
const schemaMap = require('./schemaregistry');
const resourceTables = schemaMap.resourceTables;

const db = new dao({
   host: 'localhost',
   user: 'root',
   password: '12345678',
   port: 3306,
   database: 'concordia_soen_proj'
});

const server = express();

server.use(express.json());
/*
The next part of this module is responsible for all the routing.
 */
//Give all if no query params provided
/*
SQL Safety middleware: Check the provided resource name before routing to the appropriate handler.
 */
server.use('/admin/:resource',(req,res,next)=>{
   const {resource} = req.params;
   const {table,columns} = resourceTables[resource];
   if (!table) {
      res.status(404).json({error:'Resource category not found'});
      return;
   }
   req.table_name = table;
   req.required_columns = columns;
   next();
});
/*
GET
 */
server.get('/admin/:resource',(request,response)=>{
   const {id} = request.query;

   if (!id) {
      db.fetch({
         table: request.table_name
      }).then(result=>response.json(result));
      return;
   }

   if (!utils.isNumeric(id)) {
      response.status(400).json({error: 'id must be a positive integer'});
      return;
   }

   db.fetch({
      table: request.table_name,
      filters: {
         id: Number(id)
      }
   }).then(result=>response.json(result));
});
/*
POST
 */
server.post('/admin/:resource',(request,response)=>{
   /*
   we have the validated table
   we need to extract the values from the body (already JSONIFIED using middleware)
    */
   const {name,location,available} = request.body;
   db.put({
      table: request.table_name,
      columns: request.required_columns,
      values: {
         name: name,
         location: location,
         available: available.toLowerCase() === 'true'
      }
   }).then(res=>{
      response.status(200).json({success: 'Successfully added new resource'})
   }).catch(err=>{
      response.status(500).json({error: err})
   });
});
//static
server.use(express.static('../frontend'));

server.listen(8000, () => {
   console.log('Listening on port 8000');
}); //


