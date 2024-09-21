import fastify from "fastify";

const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
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

server.get("/foo", async (request, reply) => {
  reply.send({ msg: "foo" });
});

server.get("/bar", async (request, reply) => {
  reply.send({ msg: "bind mount shit bruh" });
});

//. https://fastify.dev/docs/latest/Reference/Server/
// When deploying to a Docker, and potentially other, containers, it is advisable to listen on 0.0.0.0 because they do not default to exposing mapped ports to localhost:
server.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
