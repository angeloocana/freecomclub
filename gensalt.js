var bcrypt = require('bcryptjs');
var fs = require('fs');

var saltRounds = 10;
var envFile = './.env';

function envFileDoNotExists(next){
    fs.readFile(envFile, 'utf8', function(err, data){

        if(!data)
            return next();

        if(data.indexOf('PASSWORD_SALT') >= 0)
            return;
        else
           return next();
    });
}

function generateSalt(){
bcrypt.genSalt(saltRounds, function(err, salt){
    console.log('salt:', salt);
    fs.writeFile(envFile, 'PASSWORD_SALT=' + salt, function(err){
        if(err)
            return console.log('error writing salt to .env file:', err);

        console.log('salt saved to .env file');
    });
});
}

envFileDoNotExists(generateSalt);
