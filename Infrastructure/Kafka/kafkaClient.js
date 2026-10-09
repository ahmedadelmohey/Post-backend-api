const { Kafka } = require("kafkajs");
const kafka = new Kafka({
  clientId: "posts-api",
  brokers: ["kafka:9092"],
});
module.exports = kafka;
