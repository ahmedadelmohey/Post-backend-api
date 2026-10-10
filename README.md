# Posts Backend API

A backend application built with Node.js, Express, MongoDB, and Apache Kafka. The project demonstrates a layered architecture, REST API development, repository pattern, event-driven communication, and Docker-based deployment.

## Technologies

- **Node.js** and **Express.js** — REST API
- **MongoDB** — data persistence
- **Apache Kafka** — event messaging
- **KafkaJS** — Kafka client for Node.js
- **Docker** and **Docker Compose** — containerization

## Architecture

The project follows a simple Domain-Driven Design (DDD)-inspired layered structure.

- **API:** HTTP routes and controllers.
- **Application:** use cases for creating and retrieving posts, including application-level validation.
- **Domain:** the Post model.
- **Infrastructure:** MongoDB repositories, database connection, and Kafka producer and consumer.

### Main project structure

```text

.
├── API/
│   ├── Controllers/
│   │   └── postController.js
│   └── PostRoutes/
│       └── postRoutes.js
├── Application/
│   ├── Error/
│   │   └── AppError.js
│   ├── createPost.js
│   ├── getAll.js
│   └── getPost.js
├── Domain/
│   └── Post.js
├── Infrastructure/
│   ├── Database/
│   │   ├── getAllRepository.js
│   │   ├── getRepository.js
│   │   ├── mongoconnection.js
│   │   └── postRepository.js
│   └── Kafka/
│       ├── kafkaClient.js
│       ├── postConsumer.js
│       └── postProducer.js
├── app.js
├── runConsumer.js
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
└── package.json
```

## REST API

The API is available on port `3000` when running locally through Docker Compose.

| Method | Endpoint     | Description           |
| ------ | ------------ | --------------------- |
| POST   | `/posts`     | Create a post         |
| GET    | `/posts`     | Retrieve all posts    |
| GET    | `/posts/:id` | Retrieve a post by ID |

### Create a post

**Request**

```http
POST /posts
Content-Type: application/json
```

```json
{
  "title": "My First Post",
  "content": "This is my first post."
}
```

The API validates the input, saves the post in MongoDB, and publishes a post-created event to Kafka.

### Get all posts

```http
GET /posts
```

Returns a JSON array containing the posts.

### Get a post by ID

```http
GET /posts/:id
```

Returns the requested post when it exists.

### Error handling

The API validates required fields and handles invalid post IDs and posts that do not exist.

- `400 Bad Request` — invalid input or malformed post ID.
- `404 Not Found` — a valid post ID that does not match an existing post.

## Kafka Event Flow

When a post is created:

1. The API receives the HTTP request.
2. The application use case validates the post.
3. The repository saves the post in MongoDB.
4. The Kafka producer publishes an event to the `post-created` topic.
5. The Kafka consumer receives and logs the event.

The consumer runs as a separate service from the API.

## Running with Docker Compose

### Prerequisites

- Docker Desktop or Docker Engine with Docker Compose.
- Postman or another HTTP client for testing the API.

### Start the application

Clone the repository and open a terminal in the project root.

```bash
docker compose up --build -d
```

This builds the API image and starts the following services:

- API
- MongoDB
- Kafka
- Kafka consumer

### View application logs

```bash
docker compose logs -f api
```

View consumer logs:

```bash
docker compose logs -f consumer
```

View logs from all services:

```bash
docker compose logs -f
```

### Stop the application

```bash
docker compose down
```

MongoDB data is stored in a Docker volume so it persists across ordinary container restarts and Compose shutdowns. To remove the volume and its stored data as well, use `docker compose down -v`.

## Configuration

Docker Compose provides the network for the services to communicate using their service names.

- MongoDB: `mongo:27017`
- Kafka: `kafka:9092`
- API: port `3000`

The API is accessible from the host at:

```text
http://localhost:3000
```

## Testing

The endpoints can be tested using Postman.

Test the following scenarios:

- Create a post with valid input.
- Retrieve all posts.
- Retrieve an existing post by ID.
- Submit empty or invalid input.
- Request a post with an invalid ID.
- Request a valid ID that does not exist.
- Confirm that creating a post produces a Kafka event.
- Confirm that the consumer receives and logs the event.

## Deployment

The deployed API URL here after deployment:

**Public API URL:**(http://51.21.243.31:3000/posts)

## Deliverables

- Source code and project structure
- Dockerfile and Docker Compose configuration
- README with setup and usage instructions
- Postman collection
- Demo video showing the project structure, API, Kafka event flow, and deployed application
