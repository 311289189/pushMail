module.exports = function(context, cb) {
  const MAIL_KEY = context.data.MAIL_KEY;
  const api_key = 'key-' + MAIL_KEY;
  const domain = 'harrydix.de';
  const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
   
  const data = {
    from: 'Pushmail <push@pushmail.com>',
    to: context.body.recipient,
    subject: 'PushMail message',
    text: context.body.message
  };
   
  mailgun.messages().send(data, function (error, body) {
    return cb('Message sent to ' + context.body.recipient)
  });
};