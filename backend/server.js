const express = require('express');
const dao = require('./dao.js');
const utils = require('./utils.js');
const db = new dao({
   host: 'localhost',
   user: 'root',
   password: '12345678',
   port: 3306,
   database: 'concordia_soen_proj'
});

const resourceTableMap = {
   labs: 'rsc_labs',
   rooms: 'rsc_rooms',
   equipment: 'rsc_equipment'
};

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
   const table = resourceTableMap[resource];
   if (!table) {
      res.status(404).json({error:'Resource category not found'});
      next();
      return;
   }
   req.table = table;
   next();
});
/*
GET
 */
server.get('/admin/:resource',(request,response)=>{
   const {resource} = request.params;
   const {id} = request.query;

   if (!id) {
      db.fetch({
         table: request.table
      }).then(result=>response.json(result));
      return;
   }

   if (!utils.isNumeric(id)) {
      response.status(400).json({error: 'id must be a positive integer'});
      return;
   }

   db.fetch({
      table: request.table,
      filters: {
         id: Number(id)
      }
   }).then(result=>response.json(result));
});
/*
POST
 */
server.post('/admin/:resource',(request,response)=>{
   // Perform an insertion
});
/*
STATIC
 */
server.use(express.static('../frontend'));
server.listen(8000, () => {
   console.log('Listening on port 8000');
});


