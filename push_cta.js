var stdio = require('stdio'),
    exec = require('child_process').exec,
    Config = require('./config');

var ops = stdio.getopt({
    'type':
        {key: 'i', args: 1, description: 'the type of CTA you want to push: share/rate/removeall', mandatory: true},
    });

if(ops.type != "share" && ops.type != "rate" && ops.type != "removeall") {
    console.log("Error: type isn't one of the accepted values: rate/share/removeall");
    process.exit();
}

var cmd = 'curl --data "ctatype=' + ops.type + '&&submitkey=' + Config.submitkey + '" '+ Config.ctaurl +' ';
console.log(cmd);
exec(cmd, function(error, stdout, stderr) {
    console.log(stderr);
});
