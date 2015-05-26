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

module.exports.registerUser = function(model, done){
    if(!model.username || !model.password)
        done("Must specify username and password",false);
    else{
        User.findOne({username:model.username}, function(err, user){
            if(err) done(err,null);

            if(user) done("User exists", false);

            //Since we're more concerned with user identification rather than acutal security, we do not expire tokens
            var user = new User({username:model.username, password:model.password, name:model.name, token: uuid.v4()});
            user.save();
            done(null, user);
        });
    }

}

module.exports.getUsers = function(done){
    User.find({}, function(err,user){
        done(null,user);
    });
}