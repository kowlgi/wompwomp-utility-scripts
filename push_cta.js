var resize_upload = require('./resize_upload'),
    stdio = require('stdio'),
    exec = require('child_process').exec,
    Config = require('./config');

var ops = stdio.getopt({
    'type':
        {key: 'i', args: 1, description: 'the type of CTA you want to push: share/rate/removeall', mandatory: true},
    });


var cmd = 'curl --data "ctatype=' + ops.type + '&&submitkey=' + Config.submitkey + '" '+ Config.ctaurl +' ';
console.log(cmd);
exec(cmd, function(error, stdout, stderr) {
    console.log(stderr);
});
