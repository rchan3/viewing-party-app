var mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,useUnifiedTopology: true 
});

var db = mongoose.connection;

db.on('connected', function() {
    console.log(`connected to mongodb at ${db.host}:${db.port}`);
});