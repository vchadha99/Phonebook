const express = require('express');
var router = express.Router();

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

module.exports = router;