import { sendEmailJob } from "./queue.js";

const run = async () => {
  //first email
  await sendEmailJob({
    to: 'webcoderph+1@gmail.com',
    subject: 'MESSAGE QUEUE',
    text: 'Hi there! This email is from our Message Queue'
  });

  //second email
  await sendEmailJob({
    to: 'webcoderph+2@gmail.com',
    subject: 'MESSAGE QUEUE 2',
    text: 'Hi there! This email is from our Message Queue 2'
  });
};


run();
