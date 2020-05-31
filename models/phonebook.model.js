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

mongoose.model('phonebook', phonebookSchema);