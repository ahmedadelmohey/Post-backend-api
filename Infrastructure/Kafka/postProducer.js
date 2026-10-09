const kafka = require("./kafkaClient");
const producer = kafka.producer();
async function connectProducer() {
  await producer.connect();
  console.log("kafka producer connected.");
}
async function publishPostCreated(post) {
  const result = await producer.send({
    topic: "post-created",
    messages: [
      {
        key: post._id.toString(),
        value: JSON.stringify({
          event: "postCreated",
          postId: post._id.toString(),
          title: post.title,
        }),
      },
    ],
  });
  console.log("kafka publish result:", result);
}
module.exports = {
  connectProducer,
  publishPostCreated,
};
