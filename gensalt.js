var bcrypt = require('bcrypt');
var fs = require('fs');

var saltRounds = 10;

bcrypt.genSalt(saltRounds, function(err, salt){
    console.log('salt:', salt);
    fs.writeFile('./.env', 'PASSWORD_SALT=' + salt, function(err){
        if(err)
            return console.log('error writing salt to .env file:', err);

        console.log('salt saved to .env file');
    });
});
