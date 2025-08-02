import { FastifyReply, FastifyRequest } from 'fastify'

/* Nos middlawares, precisamos apenas interceptar caso algo não satisfaça
o nosso if */
export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionId = request.cookies.sessionId

  if (!sessionId) {
    return reply.status(401).send({
      error: 'Unauthorized',
    })
  }
}
