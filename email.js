const nodemailer = require('nodemailer');
const { SMTPServer } = require('smtp-server');

// Create a local SMTP server
const server = new SMTPServer({
    authOptional: true,
    onData(stream, session, callback) {
        stream.pipe(process.stdout); // Print the email message to the console
        stream.on('end', callback);
    }
});

// Start the SMTP server
server.listen(2525, () => {
    console.log('SMTP server is listening on port 2525');
});

// Create a transporter object using the local SMTP server
let transporter = nodemailer.createTransport({
     service: 'Gmail',
    auth: {
        user: 'ravisain75688@gmail.com', // Replace with your username if needed
        pass: 'gegeygfygydgfygjkj' // Replace with your password if needed
    }
});

// Setup email data
let mailOptions = {
    from: '"ravi sain" <ravisain75688@gmail.com>', // Sender address
    to: 'ravisain75688@gmail.com', // List of recipients
    subject: 'Hello', // Subject line
    text: 'Hello world?', // Plain text body
    html: '<b>Hello world?</b>' // HTML body
};

// Send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
});
