const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Phonebook = mongoose.model('phonebook');

router.get('/',(req , res) => {
    res.render('phonebook/phoneBookForm');
    viewTitle: 'Add/Edit';
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

function insertRecord(req, res) {
    var phonebook = new Phonebook();
    phonebook.fullName = req.body.fullName;
    phonebook.email = req.body.email;
    phonebook.altEmail = req.body.atlEmail;
    phonebook.mobile = req.body.mobile;
    phonebook.alMobile = req.body.altMobile;
    phonebook.city = req.body.city;
    phonebook.save((err, doc) => {
        if (!err)
            res.redirect('phonebook/list');
        else {
            if (err.name == 'ValidationError') {
                console.log('give correct details');
                handleValidationError(err, req.body);
                res.render('phonebook/phoneBookForm', {
                    viewTitle: "Insert Contact",
                    phonebook: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Phonebook.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('phonebook/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("phonebook/list", {
                    viewTitle: 'Update Contact',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

router.get('/list', (req, res) => {
    Phonebook.find((err, docs) => {
        if (!err) {
            res.render("phonebook/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving phonebook :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Phonebook.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("phonebook/phoneBookForm", {
                viewTitle: "Update Contact",
                employee: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Phonebook.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/phonebook/list');
        }
        else { console.log('Error in contact delete :' + err); }
    });
});


module.exports = router;