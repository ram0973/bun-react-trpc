import { initTRPC } from '@trpc/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { sleep } from 'bun';
import index from './index.html';

export const t = initTRPC.create();

export const router = t.router({
  ping: t.procedure.query(() => {
    return 'pong';
  }),

  subscribe: t.procedure.subscription(async function* () {
    await sleep(1000);
    yield Math.random();
  }),
});

export type TrpcRouter = typeof router;

const server = Bun.serve({
  routes: {
    '/trpc/*': async (req) => {
      return fetchRequestHandler({
        createContext: () => ({}) as never,
        req: req,
        endpoint: '/trpc',
        router: router,
      });
    },
    '/*': index,
  },
  // Global error handler
  error(error) {
    console.error(error);
    return new Response(`Internal Error: ${error.message}`, {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  },
  development: true,
});

console.warn(`🚀 Server running at ${server.url}`);
