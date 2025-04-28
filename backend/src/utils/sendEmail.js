import SibApiV3Sdk from 'sib-api-v3-sdk';
import dotenv from 'dotenv';
dotenv.config();

// Setup Sendinblue API client
const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.SIB_API_KEY;

const sendEmail = async ({ to, subject, text, html }) => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const sendSmtpEmail = {
    sender: { email: process.env.EMAIL_FROM, name: 'Your App Name' }, // customize App Name
    to: [{ email: to }],
    subject: subject,
    textContent: text,   // optional
    htmlContent: html,   // your HTML email body
  };

  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Email sent successfully:', response.messageId || response);
  } catch (error) {
    console.error('Error sending email:', error.response ? error.response.body : error);
    throw new Error('Email not sent');
  }
};

export default sendEmail;
