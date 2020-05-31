const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/PhoneBookDB',{useNewUrlParser: true} , (err)=>{
    if(!err){ console.log("Connection succeeded")}
    else{console.log("Connection failed " + err)}
});

require('./phonebook.model');