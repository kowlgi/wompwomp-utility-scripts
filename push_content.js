var resize_upload = require('./resize_upload'),
    stdio = require('stdio');

var ops = stdio.getopt({
    'img':
        {key: 'i', args: 1, description: 'the image you want to resize', mandatory: true},
    'quote':
        {key: 'q', args: 1, description: 'enter your quote', mandatory: true},
    'category':
        {key: 'c', args: 1, description: 'enter a category for the item', default: 'buffered', mandatory: false},
    'notifyuser':
        {key: 'n', args: 1, description: 'send push notification to user? (yes/no)', default: 'no', mandatory: false},
    'padding':
        {key: 'p', args: 1, description: 'turn on image padding (yes/no)', default: 'yes', mandatory: false}
    });

resize_upload.fetch(ops.img, ops.notifyuser, ops.quote, ops.category, ops.padding);
