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

svRoutes.route('/').get(function (req, res) {
    sinhVien.find(function(err, svs){
        if(err){
            console.log(err);
        }
        else {
            res.json(svs);
        }
    });
})

svRoutes.route('/update/:id').post(function (req, res) {
    sinhVien.findOneAndUpdate({"_id" : req.params.id}, function(err, sv) {
        if (!sv)
            res.status(404).send("data is not found");
        else {
            sv.name = req.name;
            sv.date = req.date;
            sv.class = req.class;
            sv.enterRoom = req.enterRoom;
            sv.save().then(business => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

module.exports = svRoutes;