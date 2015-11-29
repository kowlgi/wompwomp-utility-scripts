// IMPORTANT: Install GraphicMagick on your computer before running this tool
var stdio = require('stdio'),
    gm = require('gm'),
    tmp = require('tmp'),
    fs = require('fs'),
    request = require('request'),
    stdio = require('stdio'),
    colors = require('colors'),
    inquirer = require('inquirer'),
    imgur = require('imgur-node-api'),
    exec = require('child_process').exec,
    Config = require('./config');

function upload(img, notify_user, quote, category) {
  imgur.setClientID(Config.imgurkey);
  imgur.upload(img, function (err, res) {
    if(err) {
      console.log(err);
      return;
    }
    console.log(('\n\tYour URL:\t' + res.data.link).bold.red);
    console.log(('\tYour caption:\t' + quote).bold.yellow);
    if(notify_user == "yes") {
      console.log(('\tNotifications:\tON').bold.red);
    } else {
      console.log(('\tNotifications:\tOFF').yellow);
    }
    console.log(('\tPushing to:\t' + Config.submiturl).bold.magenta + '\n');
    inquirer.prompt({
      type: "confirm",
      name: "proceed",
      message: "BE CAREFUL!! Would you like to upload the image and the caption?",
    }, function(answers) {
      if (!answers.proceed) {
        console.log('bye'.white);
        process.exit();
      } else {
        var tmp_fname = tmp.tmpNameSync();
        console.log(('Created temporary filename: ', tmp_fname).white);
        fs.rename(img, tmp_fname, function(err) {
            if (err) {
              console.log(('Could not rename: ' + img + ' ' + tmp_fname + err).red);
            }
            notifyuser = "no";
            if(notify_user == "yes") {
              notifyuser = "content";
            }
            var cmd = 'curl --data "text=' + quote + '&&imageuri=' + res.data.link +
                      '&&category=' + category + '&&submitkey=' + Config.submitkey +
                      '&&notifyuser=' + notifyuser + '&&sourceuri=' + img + '" '+ Config.submiturl +' ';
            console.log(('Running: ' + cmd).white);
            exec(cmd, function(error, stdout, stderr) {
              console.log(stderr);
            });
        });
      }
    });
  });
};

function resize(fname, width_int, height_int, notify_user, quote, category, upload_callback) {
  // Resize the image and write it out to this file
  var out_fname = tmp.tmpNameSync();
  gm(fname)
    .resize(width_int, height_int, '^')
    .gravity('Center')
    .extent(width_int, height_int)
    .noProfile()
    .write(out_fname, function (err) {
      if (!err) {
        console.log(('Converted to ' + out_fname).bold.white);
        gm(out_fname).size(function(err, value) {
          if (!err) {
            if (value.width == Config.width && value.height == Config.height) {
              console.log(('Converted image to size requested').bold.white);
              upload_callback(out_fname, notify_user, quote, category);
            } else {
              console.log(('Unable to covert to size requested. Exiting').red);
              process.exit(1);
            }
          }
        });
      } else {
        console.log(err);
      }
    });
};

function fetch_internal(image_path, notify_user, quote, category, resize_callback) {
  // Create a local copy of the image
  var img = tmp.tmpNameSync();
  if (image_path.indexOf("http://") > -1 || image_path.indexOf("https://") > -1) {
    console.log(('Fetching ' + image_path).bold.white);
    var stream = fs.createWriteStream(img);
    request(image_path).pipe(stream);
    stream.once('close', function() {
      resize_callback(img, Config.width, Config.height, notify_user, quote, category, upload);
    });
  } else {
    resize_callback(image_path, Config.width, Config.height, notify_user, quote, category, upload);
  }
};

exports.fetch = function(image_path, notify_user, quote, category) {
  fetch_internal(image_path, notify_user, quote, category, resize);
}
