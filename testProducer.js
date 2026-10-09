const {
  connectProducer,
  publishPostCreated,
} = require("./Infrastructure/Kafka/postProducer");
async function main() {
  await connectProducer();
  await publishPostCreated({
    _id: "123",
    title: "test",
  });
  console.log("Event published successfully");
  process.exit(0);
}
main().catch((err) => {
  console.log(err);
  process.exit(1);
});
