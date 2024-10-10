import { fastify } from "fastify";
import router from "./router";

const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
        messageFormat: "{msg} {req.method} {req.url}",
        //hideObject: true,
      },
    },
  },
  production: true,
  test: false,
};

const server = fastify({
  logger: envToLogger["development"] ?? true,
});

server.register(router);

server.get("/bar", async (request, reply) => {
  reply.send({ msg: "bar" });
});

server.listen({ port: 8080, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
