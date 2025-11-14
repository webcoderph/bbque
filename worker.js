import { Worker } from 'bullmq';
import nodemailer from 'nodemailer';
import { connection } from './helper.js';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  auth: {
    user: process.env.MAILER_USERNAME,
    pass: process.env.MAILER_PASSWORD,
  }
});

const worker = new Worker('bbque', async (job) =>  {
  console.log('>>>SENDING EMAIL', job.data.to);

  //SMTP
  const mailOptions = {
    from: `"BBQUE" <${process.env.MAILER_FROM}>`,
    to: job.data.to,
    subject: job.data.subject,
    text: job.data.text,
    html: job.data.html || `<p>${job.data.text}</p>`
  }; 

  await transporter.sendMail(mailOptions);
  console.log('>>>EMAIL SENT');

}, { connection });


worker.on('completed', (job) => console.log('>>JOB DONE', job.id));
worker.on('failed', (job, err) => console.error('>>>JOB FAILED', err.message));
