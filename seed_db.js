var _ = require('lodash'),
  stdio = require('stdio'),
  exec = require('child_process').exec,
  Config = require('./config'),
  resize_upload = require('./resize_upload');

var ops = stdio.getopt({
    'category':
        {key: 'c', args: 1, description: 'enter a category for the item', default: 'test', mandatory: false},
    'notifyuser':
        {key: 'n', args: 1, description: 'send push notification to user? (yes/no)', default: 'no', mandatory: false}
    });

var entries = [
  { 'url': 'http://i.imgur.com/KBku2xi.jpg', 'quote': 'they must hate people' },
  { 'url': 'http://i.imgur.com/BHZYUyj.jpg', 'quote': 'amazonian girl and her pet sloth' },
  { 'url': 'http://i.imgur.com/uKnMvyp.jpg', 'quote': 'in dog we trust' },
  { 'url': 'http://i.imgur.com/Xsu770n.jpg', 'quote': 'racoon' },
  { 'url': 'http://i.imgur.com/I93Vp.jpg', 'quote': 'Photo I took of the Chicago skyline from a beach in Indiana' },
  { 'url': 'http://i.imgur.com/G8nseoV.jpg', 'quote': 'halloween costume' },
  { 'url': 'http://img.hindilinks4u.to/2010/08/Farishtay-1991.jpg', 'quote': 'should\'ve been nominated for the oscars' },
  { 'url': 'http://i.imgur.com/DEvgS4S.jpg', 'quote': 'granny\'s favorite websites' },
  { 'url': 'http://i.imgur.com/xygc39y.jpg', 'quote': ' pro hide and seek' },
  { 'url': 'http://i.imgur.com/dS1gW.jpg', 'quote': 'mom was worried about my trip to grand canyon. so i sent her this.' },
  { 'url': 'http://i.imgur.com/JPOsSc1.jpg', 'quote': 'Blue screen of death' },
];

_.forEach(entries, function(entry) {
  resize_upload.fetch(entry.url, ops.notifyuser, entry.quote, ops.category);
});
