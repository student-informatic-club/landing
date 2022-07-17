const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SinhVien = new Schema({
    svId: {
        type: String
    },
    name: {
        type: String
    },
    date: {
        type: String
    },
    class: {
        type: String
    },
    enterRoom: {
        type: Boolean
    }
}, {
    collection: 'SinhVien'
});

module.exports = mongoose.model('SinhVien', SinhVien);

