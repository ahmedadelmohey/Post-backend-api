const { startConsumer } = require("./Infrastructure/Kafka/postConsumer");
startConsumer().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
