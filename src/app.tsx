import type React from 'react';
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

import type { TrpcRouter } from '@/index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCReact, httpBatchLink } from '@trpc/react-query';

export const trpc = createTRPCReact<TrpcRouter>();

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/trpc',
        }),
      ],
      // links: [
      //   splitLink({
      //     condition: (op) => op.type === "subscription",
      //     true: wsLink({
      //       client: createWSClient({
      //         url: "ws://localhost:3000/trpc",
      //       }),
      //     }),
      //     false: httpLink({ url: "http://localhost:3000/trpc" }),
      //   }),
      // ],
    }),
  );

  const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
    return (
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </trpc.Provider>
    );
  };

  return <TrpcProvider>Hello, world! {Date.now()}</TrpcProvider>;
}

const elem = document.getElementById('root');
if (!elem) {
  throw new Error('Root element not found')
}
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (import.meta.hot) {
  // With hot module reloading, `import.meta.hot.data` is persisted.
  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  const root = (import.meta.hot.data.root ??= createRoot(elem));
  root.render(app);
} else {
  // The hot module reloading API is not available in production.
  createRoot(elem).render(app);
}
