const nodemailer = require("nodemailer");

class MailService {
    static transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "berrmedd@gmail.com",
            pass: "pyuk edxr efrf neeb",
        },
    });

    static async sendWelcomeEmail(userEmail, userName) {
        const mailOptions = {
            from: "berrmedd@gmail.com",
            to: userEmail,
            subject: "Welcome to Our App",
            text: `Dear ${userName},\n\nWelcome to our app! We're excited to have you on board.\n\nBest regards,\nThe App Team`,
        };
        return MailService.transporter.sendMail(mailOptions);
    }

    static async sendNewReservationToDoctor(doctorEmail, ...reservationDetails) {
        const [email, name, notes, date, time, status] = reservationDetails;
        const readableReservationDetails = `
User Email: ${email}
User Name: ${name}
Notes: ${notes}
Date: ${date}
Time: ${time}
Status: ${status}
        `;
        const text = readableReservationDetails;
        if (!email || !text) {
            throw new Error("User email and status details must be provided");
        }
        const mailOptions = {
            from: "berrmedd@gmail.com",
            to: doctorEmail,
            subject: "New Reservation Notification",
            text: `Hello,\n\nYou have a new reservation in the app:\n${text}\n\nBest regards,\nThe App Team`,
        };
        return MailService.transporter.sendMail(mailOptions);
    }

    static async sendStatusChangeToPatient(patientEmail, statusDetails) {
        const mailOptions = {
            from: "berrmedd@gmail.com",
            to: patientEmail,
            subject: "Your Reservation Status Changed",
            text: `Hello,\n\nYour reservation status has changed:\n${statusDetails}\n\nBest regards,\nThe App Team`,
        };
        return MailService.transporter.sendMail(mailOptions);
    }
}

module.exports = MailService;
