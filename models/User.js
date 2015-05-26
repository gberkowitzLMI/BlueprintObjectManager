var mongoose = require('mongoose');
var uuid = require('uuid');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name:String,
    token: String,
    roles: [String]
});

var User = mongoose.model('User',userSchema);

module.exports.User = User;

module.exports.registerUser = function(username, password, done){
    if(!username || !password)
        done(null,false);
    else{
        User.findOne({username:username}, function(err, user){
            if(err) done(err,null);

            if(user) done(err, false);

            //Since we're more concerned with user identification rather than acutal security, we do not expire tokens
            new User({username:username, password:password, token: uuid.v4()}).save();
            done(null, true);
        });
    }

}

module.exports.getUsers = function(done){
    User.find({}, function(err,user){
        done(null,user);
    });
}