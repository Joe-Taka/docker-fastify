import { FastifyInstance } from "fastify";
import newsController from "./controller/newsController";

export default async function router(fastify: FastifyInstance) {
  fastify.register(newsController, { prefix: "/news" });
}
