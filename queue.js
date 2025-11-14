import { Queue } from "bullmq";
import { connection } from "./helper.js";

export const emailQueue = new Queue('bbque', { connection });

export const sendEmailJob = async (data) => {
  await emailQueue.add('sendEmail', data, {
    attempts: 3,
    backoff: { type: 'exponential', delay: 2000 }
  });


  console.log('>>>EMAIL JOB ADDED', data);
};


