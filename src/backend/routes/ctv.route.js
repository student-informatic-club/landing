const express = require('express');
const ctvRoutes = express.Router();

// Require Business model in our routes module
let Ctv = require('../models/ctv.model');

// Defined store route
ctvRoutes.route('/add').post(function (req, res) {
    let ctv = new Ctv(req.body);
    ctv.save()
        .then(Ctv => {
            res.status(200).json({'Ctv': 'Ctv in added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

// Defined get data(index or listing) route
ctvRoutes.route('/').get(function (req, res) {
    Ctv.find(function(err, Ctvs){
        if(err){
            console.log(err);
        }
        else {
            res.json(Ctvs);
        }
    });
});

// // Defined edit route
// ctvRoutes.route('/edit/:id').get(function (req, res) {
//     let id = req.params.id;
//     Ctv.findById(id, function (err, business){
//         res.json(business);
//     });
// });

// //  Defined update route
// ctvRoutes.route('/update/:id').post(function (req, res) {
//     Ctv.findById(req.params.id, function(err, Ctv) {
//         if (!Ctv)
//             res.status(404).send("data is not found");
//         else {
//             console.log(Ctv);
//             Ctv.name = req.body.name;
//             Ctv.company = req.body.company;
//             Ctv.age = req.body.age;

//             Ctv.save().then(business => {
//                 res.json('Update complete');
//             })
//                 .catch(err => {
//                     res.status(400).send("unable to update the database");
//                 });
//         }
//     });
// });

// // Defined delete | remove | destroy route
// ctvRoutes.route('/delete/:id').get(function (req, res) {
//     Ctv.findByIdAndRemove({_id: req.params.id}, function(err, Ctv){
//         if(err) res.json(err);
//         else res.json('Successfully removed');
//     });
// });

module.exports = ctvRoutes;

