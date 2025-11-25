module.exports.resourceTables = {
    labs: {
        table: 'rsc_labs',
        columns: {
            name: 'VARCHAR',
            location: 'VARCHAR',
            available: 'BOOLEAN'
        }
    },
    rooms: {
        table: 'rsc_rooms',
        columns: {
            name: 'VARCHAR',
            location: 'VARCHAR',
            available: 'BOOLEAN'
        }
    },
    equipment: {
        table: 'rsc_equipment',
        columns: {
            name: 'VARCHAR',
            location: 'VARCHAR',
            available: 'BOOLEAN'
        }
    }
};

module.exports.requestsTables = {

}

