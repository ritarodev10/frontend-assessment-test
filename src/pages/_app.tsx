import { WishlistProvider } from 'hooks/useWishlist';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WishlistProvider>
        <Component {...pageProps} />
      </WishlistProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
