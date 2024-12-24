import amqp from 'amqplib';

const sendNotificationToQueue = async (email, subject, text) => {
  console.log(process.env.RABBITMQ_URL);
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    console.log("Connected to RabbitMQ", connection);
    const channel = await connection.createChannel();

    const queue = "user_notifications";
    await channel.assertQueue(queue, { durable: true });

    const message = JSON.stringify({ email, subject, text });

    // Send the message to the queu
    channel.sendToQueue(queue, Buffer.from(message), { persistent: true });

    console.log("Notification message sent to queue:", message,queue);

    // Close the connection
    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error("Error sending notification to RabbitMQ:", error);
  }
};

export default sendNotificationToQueue;
