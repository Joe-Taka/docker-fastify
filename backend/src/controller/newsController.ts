import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { delay } from "../utils";

export default async function newsController(fastify: FastifyInstance) {
  await delay(800);
  fastify.get(
    "/",
    async function (_request: FastifyRequest, reply: FastifyReply) {
      reply.send({
        prefix: "/news",
        params: ["id"],
      });
    }
  );

  fastify.get(
    "/:id",
    async function (request: FastifyRequest, reply: FastifyReply) {
      //console.log('request.query', request.query);
      //console.log('request.headers', request.headers); 
      //console.log('request.body', request.body); 
      console.log('request.params', request.params); 
      const { id } = <{ id: string }>request.params;
      reply.send({
        prefix: "/news",
        params: [`id: ${id}`],
      });
    }
  );
}
