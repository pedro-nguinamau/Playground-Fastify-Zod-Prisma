import fastify from "fastify";
import CreateUserRoutes from "./routes/UserRoutes";
const server = fastify({ logger: false})

server.register(CreateUserRoutes, { prefix: '/api/v1'})

server.listen({port: 8080}, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening on address ${address}`);
});
    