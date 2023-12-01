const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

/**
 * Sends an email using a specified HTML template.
 * 
 * @param {string} email - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} templateName - The name of the HTML template file (without extension).
 * @param {object} templateData - An object containing the data for replacing placeholders in the template.
 */
const sendEmail = async (email, subject, templateName, templateData) => {
  try {
    // Path to the email template
    const templatePath = path.join(__dirname, 'templates', `${templateName}.html`);
    let htmlContent = fs.readFileSync(templatePath, 'utf-8');

    // Replace placeholders with actual data
    for (const key in templateData) {
      if (templateData.hasOwnProperty(key)) {
        htmlContent = htmlContent.replace(new RegExp(`{{${key}}}`, 'g'), templateData[key]);
      }
    }

    // Email transporter configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
    });

    // Mail options
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: subject,
      html: htmlContent // Send HTML content
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
