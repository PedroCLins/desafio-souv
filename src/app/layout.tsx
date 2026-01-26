import type { Metadata } from 'next';

import { ThemeProvider } from '../components/theme-provider'; 
import NextAuthSessionProvider from '../providers/sessionProvider';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Next.js Boilerplate',
  description: 'A simple boilerplate for next.js',
  manifest: '/manifest.json'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}