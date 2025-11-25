module.exports.schemaMap = {
    labs: {
        table: 'rsc_labs',
        columns: {
            name: 'VARCHAR',
            location: 'VARCHAR',
            capacity: 'INT',
            available: 'BOOLEAN'
        }
    },
    rooms: {
        table: 'rsc_rooms',
        columns: {
            name: 'VARCHAR',
            location: 'VARCHAR',
            capacity: 'INT',
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

