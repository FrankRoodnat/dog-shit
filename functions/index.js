const functions = require('firebase-functions');
const admin = require('firebase-admin')
const nodemailer = require('nodemailer')
const cors = require('cors')({ origin: true });
admin.initializeApp()

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'guusmoetplassen@gmail.com',
        pass: 'dogshit21'
    }
});


exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        // getting dest email by query string
        const dest = req.query.dest;

        const mailOptions = {
            from: 'Guus <guusmoetplassen@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: dest,
            subject: 'Ik moet poepen', // email subject
            html: `<p style="font-size: 16px;">Laat me even uit aub.</p>
                <br />
            ` // email content in HTML
        };

        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if (erro) {
                return res.send(erro.toString());
            }
            return res.send('Sent');
        });
    });
});