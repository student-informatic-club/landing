const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let CTV = new Schema({
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    class: {
        type: String
    },
    answer: {
        type: Array
    },
    message: {
        type: String
    }
}, {
    collection: 'CTV'
});

module.exports = mongoose.model('CTV', CTV);