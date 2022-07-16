const express = require('express');
const svRoutes = express.Router();

let sinhVien = require('../models/sinhvien.model');

svRoutes.route('/add').post(function (req, res) {
    let SinhVien = new sinhVien(req.body);
    SinhVien.save()
    .then(Sv => {
        res.status(200).json({'SinhVien': 'SinhVien in added successfully'})
    })
    .catch(Sv => {
        res.status(400).send("unable to save to database");
    })
})

svRoutes.route('/').post(function (req, res) {
    sinhVien.find(function(err, Ctvs){
        if(err){
            console.log(err);
        }
        else {
            res.json(Ctvs);
        }
    });
})

module.exports = svRoutes;