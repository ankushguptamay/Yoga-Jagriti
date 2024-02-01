const brevo = require('@getbrevo/brevo');

exports.sendEmail = (options) => {
    return new Promise((resolve, reject) => {
        let defaultClient = brevo.ApiClient.instance;
        let apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = options.brevoKey;
        let apiInstance = new brevo.TransactionalEmailsApi();
        let sendSmtpEmail = new brevo.SendSmtpEmail();
        sendSmtpEmail.subject = "YOGA JAGRITI";
        sendSmtpEmail.sender = { "name": "Yoga Jagriti", "email": options.brevoEmail };
        sendSmtpEmail.replyTo = { "email": options.brevoEmail, "name": "Yoga Jagriti" };
        sendSmtpEmail.headers = options.headers;
        sendSmtpEmail.htmlContent = options.htmlContent;
        sendSmtpEmail.to = [
            { "email": options.userEmail, "name": options.userName }
        ];
        apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
            console.log('API called successfully. Returned data: ' + JSON.stringify(data));
            resolve(JSON.stringify(data));
        }, function (error) {
            reject(error);
        });
    })
}