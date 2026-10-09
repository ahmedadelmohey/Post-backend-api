const kafka = require("./kafkaClient");
const consumer = kafka.consumer({
  groupId: "post-group",
});
async function startConsumer() {
  await consumer.connect();
  await consumer.subscribe({
    topic: "post-created",
    fromBeginning: true,
  });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const event = JSON.parse(message.value.toString());
      console.log("event: ", event);
    },
  });
}
module.exports = { startConsumer };
