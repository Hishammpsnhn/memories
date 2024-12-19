const amqp = require('amqplib');
const nodemailer = require('nodemailer');

// Set up the email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ID, // Environment variable for the email ID
    pass: process.env.PASS_KEY,
  },
});

const connectToRabbitMQ = async () => {
  console.log("conectig ....")
  let connection;
  let retries = 5;
  while (retries) {
    try {
      connection = await amqp.connect('amqp://rabbitmq:5672');
      console.log("connection", connection)
      const channel = await connection.createChannel();
      console.log('Channel created',channel);
      await channel.assertQueue('emailQueue', { durable: true });
      console.log('Connected to RabbitMQ');
      return channel;
    } catch (error) {
      console.error('Error connecting to RabbitMQ, retrying...', error);
      retries -= 1;
      await new Promise(res => setTimeout(res, 5000)); // wait 5 seconds before retrying
    }
  }
  throw new Error('Failed to connect to RabbitMQ after multiple attempts');
};


// Send email notification
const sendNotification = async (emailData) => {
  console.log('Sending email notification process')
  try {
    const mailOptions = {
      from: 'hishammpsn@gmail.com',
      to: 'hishammpsnhn@gmail.com',
      subject: emailData.subject,
      text: emailData.text,
    };
    console.log(mailOptions);

    await transporter.sendMail(mailOptions);
    console.log('Notification sent successfully');
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

// Consume messages from RabbitMQ
const startConsuming = async () => {
  const channel = await connectToRabbitMQ();
  console.log('Waiting for messages in emailQueue...');
  
  channel.consume('user_notifications', (msg) => {
    if (msg !== null) {
      const emailData = JSON.parse(msg.content.toString());
      console.log('Received message:', emailData);
      sendNotification(emailData);
      channel.ack(msg); 
    }
  });
};

startConsuming();
