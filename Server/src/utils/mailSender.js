import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config();

const mailSender = async (email, title, body) => {
    try {
        let transporter = await nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })

        let info = await transporter.sendMail({
            from : `"VIDEOTUBE || Krishna-Vakte" <kvakte00@gmail.com>`,
            to : `${email}`,
            subject : `${title}`,
            html:`${body}`,
        });

        console.log(info);
        return info;
    } catch (error) {
        console.log(error.message);
    }
};

export default mailSender;