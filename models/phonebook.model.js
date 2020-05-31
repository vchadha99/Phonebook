const mongoose = require('mongoose');

var phonebookSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    altEmail: {
        type: String
    },
    mobile: {
        type: String
    },
    altMobile: {
        type: String
    },
    address: {
        type: String
    }
});

phonebookSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('phonebook', phonebookSchema);