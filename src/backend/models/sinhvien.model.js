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
    EnterRoom: {
        type: Boolean
    }
}, {collation: "SinhVien"})

module.exports = mongoose.model('SinhVien', SinhVien);

