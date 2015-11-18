var stdio = require('stdio'),
    exec = require('child_process').exec,
    Config = require('./config');

var ops = stdio.getopt({
    'id':
        {key: 'i', args: 1, description: 'the id of the item you want to hide from users', mandatory: true},
    });


var cmd = 'curl --data "id=' + ops.id + '&&submitkey=' + Config.submitkey + '" '+ Config.hideitemurl +' ';
console.log(cmd);
exec(cmd, function(error, stdout, stderr) {
    console.log(stderr);
});
