const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
 const {incrementVisit,getMostVisitedLocation} = require('./controller/analyticController'); // Import the model

dotenv.config();

const packageDefinition = protoLoader.loadSync('proto/analytical.proto', {});
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();

server.addService(todoPackage.Todo.service, {
  "createTodo": createTodo,
  "getTodos": readTodos,
});

async function createTodo(call, callback) {
  console.log(call.request);
  const a = await incrementVisit(call.request.location); 
  console.log(a);
  callback(null, { count: a });
}

function readTodos(call, callback) {
  console.log(call.request);
  const todos = { items: [] }; 
  callback(null, todos);
}

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Bind gRPC server after MongoDB connection is successful
    server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(), (error, port) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(`Server running at http://0.0.0.0:${port}`);
      server.start();
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

startServer();
