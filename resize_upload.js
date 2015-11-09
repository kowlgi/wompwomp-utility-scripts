// IMPORTANT: Install GraphicMagick on your computer before running this tool
var stdio = require('stdio'),
    gm = require('gm'),
    fs = require('fs'),
    request = require('request'),
    stdio = require('stdio'),
    imgur = require('imgur-node-api'),
    exec = require('child_process').exec,
    Config = require('./config');

var ops = stdio.getopt({
    'img':
        {key: 'i', args: 1, description: 'the image you want to resize', mandatory: true},
    'quote':
        {key: 'q', args: 1, description: 'enter your quote', mandatory: true},
    'category':
        {key: 'c', args: 1, description: 'enter a category for the item', default: 'test', mandatory: false},
    'notifyuser':
        {key: 'n', args: 1, description: 'send push notification to user? (yes/no)', default: 'no', mandatory: false}
    });

function upload(img) {
  imgur.setClientID(Config.imgurkey);
  imgur.upload(img, function (err, res) {
      if(err) {
          console.log(err);
          return;
      }

    console.log('Uploaded to ' + res.data.link);

    fs.rename(img, 'images/'+ res.data.id + '.jpg', function(err) {
        if ( err ) console.log('ERROR: ' + err);

        notifyuser = "no";
        if(ops.notifyuser == "yes") {
            notifyuser = "content"
        }

        var cmd = 'curl --data "text=' + ops.quote + '&&imageuri=' + res.data.link +
                  '&&category=' + ops.category + '&&submitkey=' + Config.submitkey +
                  '&&notifyuser=' + notifyuser + '&&sourceuri=' + ops.img + '" '+ Config.url +' ';
        console.log(cmd);
        exec(cmd, function(error, stdout, stderr) {
          console.log(stderr);
        });
    });
  });
};

function resize(fname, width_int, height_int, callback) {
  width = width_int.toString();
  height = height_int.toString();
  strip_extension = fname.replace(/\.[^/.]+$/, "");
  extension = fname.substr(fname.lastIndexOf('.') + 1);
  out_fname = strip_extension + '_' + width + '_' + height + '.' + extension;
  gm(fname)
    .resize(width_int, height_int, '^')
    .gravity('Center')
    .extent(width_int, height_int)
    .noProfile()
    .write(out_fname, function (err) {
      if (!err) {
        console.log('Converted ' + ops.img + ' to ' + out_fname);
        gm(out_fname).size(function(err, value) {
          if (!err) {
            console.log('width = ' + value.width + ' height = ' + value.height);
            if (value.width == Config.width && value.height == Config.height) {
              console.log('Converted to size requested. Uploading to imgur');
              callback(out_fname);
            } else {
              console.log('Unable to covert to size requested. Exiting');
              process.exit(1);
            }
          }
        });
      } else {
        console.log(err);
      }
    });
};

function fetch(callback) {
  var img = 'img';
  if (ops.img.indexOf("http://") > -1 || ops.img.indexOf("https://") > -1) {
    console.log('Fetching ' + ops.img);
    var stream = fs.createWriteStream(img);
    request(ops.img).pipe(stream);
    stream.once('close', function() {
      callback(img, Config.width, Config.height, upload);
    });
  } else {
    callback(ops.img, Config.width, Config.height, upload);
  }
};

fetch(resize);
